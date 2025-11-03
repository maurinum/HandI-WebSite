import { Injectable, signal } from '@angular/core';
import { Message } from '../models/chat';
import { AssistantService } from './assistant.service';
import { environment } from '../../environments/environment';


interface SendReq { /* keep your fields exactly as you had */ }
type NdJsonEnvelope =
  | { user_message_id: number; reserved_assistant_message_id: number }
  | { ind: number; obj: StreamObj };

type StreamObj =
  | { type: 'message_start'; final_documents: any[]; content: string }
  | { type: 'message_delta'; content: string }
  | { type: 'section_end' }
  | { type: 'stop' }
  | { type: 'error'; error_msg?: string };

@Injectable({ providedIn: 'root' })
export class ChatService {
  private store = new Map<string, Message[]>();
  private lastAssistantMsgId = new Map<string, number>();
  messages = signal<Message[]>([]);
  isTyping = signal<boolean>(false);

  constructor(private assistants: AssistantService) { }

  loadSession(sessionId: string) {
    const list = this.store.get(sessionId) ?? [];
    this.messages.set(list);
  }

  /** Append a message to session */
  private add(sessionId: string, msg: Message) {
    const list = this.store.get(sessionId) ?? [];
    const next = [...list, msg];
    this.store.set(sessionId, next);
    this.messages.set(next);
  }

  /** Update an existing message (by local id) */
  private patchMessage(sessionId: string, localId: string, patch: Partial<Message>) {
    const list = this.store.get(sessionId) ?? [];
    const next = list.map(m => (m.id === localId ? { ...m, ...patch } : m));
    this.store.set(sessionId, next);
    this.messages.set(next);
  }

  /** Concatenate text onto an assistant placeholder */
  private appendToAssistant(sessionId: string, localId: string, chunk: string) {
    const list = this.store.get(sessionId) ?? [];
    const target = list.find(m => m.id === localId);
    const current = target?.text ?? '';
    this.patchMessage(sessionId, localId, { text: current + chunk });
  }

  /**
   * Send a message and stream the assistant reply (NDJSON lines),
   * concatenating "message_delta" content as it arrives.
   */
  async send(sessionId: string, text: string, assistantId: number) {
    // 1) optimistic user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      sessionId,
      role: 'user',
      text,
      createdAt: Date.now(),
    };
    this.add(sessionId, userMsg);

    // 2) build payload
    const parent = this.lastAssistantMsgId.get(sessionId) ?? null;
    const asst = this.assistants.getById(assistantId);
    const req: SendReq = {
      alternate_assistant_id: assistantId,
      chat_session_id: sessionId,
      parent_message_id: parent,
      message: text,
      prompt_id: null,
      search_doc_ids: null,
      file_descriptors: [],
      regenerate: false,
      retrieval_options: {
        run_search: 'auto',
        real_time: true,
        filters: { source_type: null, document_set: null, time_cutoff: null, tags: [] },
      },
      prompt_override: null,
      llm_override: asst
        ? {
          model_provider: asst.llm_model_provider_override ?? null,
          model_version: asst.llm_model_version_override ?? null,
        }
        : undefined,
      use_agentic_search: false,
    };

    const url = `${environment.apiBaseUrl}/api/chat/send-message`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (url.startsWith(environment.apiBaseUrl.replace(/\/$/, '')) && environment.apiKey) {
      headers['Authorization'] = `Bearer ${environment.apiKey}`;
    }

    // 3) create assistant placeholder (will be filled incrementally)
    const assistantLocalId = crypto.randomUUID();
    const placeholder: Message = {
      id: assistantLocalId,
      sessionId,
      role: 'assistant',
      text: '',
      createdAt: Date.now(),
      assistantId,
    };
    this.add(sessionId, placeholder);

    this.isTyping.set(true);

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req),
      });

      if (!resp.ok || !resp.body) {
        const msg = `HTTP ${resp.status} ${resp.statusText}`;
        this.patchMessage(sessionId, assistantLocalId, { text: `⚠️ Failed to send message: ${msg}` });
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let reservedAssistantMessageId: number | null = null;
      let stopped = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines
        let nlIndex: number;
        while ((nlIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, nlIndex).trim();
          buffer = buffer.slice(nlIndex + 1);

          if (!line) continue;

          const evt = this.safeJson(line) as NdJsonEnvelope | null;
          if (!evt) continue;

          // Case 1: envelope with reserved ids
          if ('user_message_id' in evt && 'reserved_assistant_message_id' in evt) {
            reservedAssistantMessageId = evt.reserved_assistant_message_id;
            this.lastAssistantMsgId.set(sessionId, reservedAssistantMessageId);
            // also store on the placeholder for later usage
            this.patchMessage(sessionId, assistantLocalId, {
              serverMessageId: reservedAssistantMessageId,
            });
            continue;
          }

          // Case 2: streaming object
          if ('ind' in evt && 'obj' in evt) {
            const obj = evt.obj as StreamObj;

            switch (obj.type) {
              case 'message_start':
                // nothing to show (content may be ""), keep typing
                break;

              case 'message_delta': {
                const piece = obj.content ?? '';
                if (piece) this.appendToAssistant(sessionId, assistantLocalId, piece);
                break;
              }

              case 'error': {
                const err = (obj as any).error_msg || 'Unknown error';
                this.appendToAssistant(sessionId, assistantLocalId, `\n⚠️ ${err}`);
                break;
              }

              case 'section_end':
                // can be ignored for display
                break;

              case 'stop':
                stopped = true;
                break;
            }
          }
        }
      }

      // Flush any remaining partial line in buffer
      const tail = buffer.trim();
      if (tail) {
        const evt = this.safeJson(tail) as NdJsonEnvelope | null;
        if (evt && 'ind' in evt && 'obj' in evt && evt.obj.type === 'message_delta') {
          const piece = evt.obj.content ?? '';
          if (piece) this.appendToAssistant(sessionId, assistantLocalId, piece);
        }
      }

      // If the model failed silently and returned the fallback string,
      // convert that to an error-looking message (your earlier requirement).
      const finalText =
        (this.store.get(sessionId) ?? []).find(m => m.id === assistantLocalId)?.text ?? '';
      if (finalText.trim() === "I couldn't generate a response.") {
        this.patchMessage(sessionId, assistantLocalId, { text: '⚠️ I couldn’t generate a response.' });
      }

      // Make sure we remember parent for next turns
      if (reservedAssistantMessageId != null) {
        this.lastAssistantMsgId.set(sessionId, reservedAssistantMessageId);
      }

      // If server never sent "stop", still end typing
      if (!stopped) {
        // no-op; UI only needs typing=false
      }
    } catch (e: any) {
      this.patchMessage(sessionId, assistantLocalId, {
        text: `⚠️ Failed to send message: ${e?.message || e}`,
      });
    } finally {
      this.isTyping.set(false);
    }
  }

  private safeJson(line: string): unknown | null {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }
}
