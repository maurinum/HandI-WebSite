import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../environments/environment';

interface CreateChatSessionRequest {
  persona_id: number;
  description: string;
}
interface CreateChatSessionResponse {
  chat_session_id: string;
}

const LS_KEY = 'hi.chat.session.id';

@Injectable({ providedIn: 'root' })
export class ChatSessionService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ✅ DO NOT read localStorage here
  sessionId = signal<string | null>(null);
  assistantId = signal<number>(0);

  constructor(private http: HttpClient) {
    // ✅ Read localStorage only on the browser, inside constructor
    if (this.isBrowser) {
      try {
        const saved = globalThis.localStorage.getItem(LS_KEY);
        if (saved) this.sessionId.set(saved);
      } catch {
        // ignore
      }
    }
  }

  get(): string | null {
    return this.sessionId();
  }

  async ensureSession(): Promise<string> {
    const existing = this.sessionId();
    if (existing) return existing;

    const endpoint = `${environment.apiBaseUrl}/api/chat/create-chat-session`;
    const payload: CreateChatSessionRequest = {
      persona_id: 0,
      description: 'chat-session via the web',
    };

    const res = await this.http.post<CreateChatSessionResponse>(endpoint, payload).toPromise();
    const id = res?.chat_session_id ?? crypto.randomUUID();

    this.sessionId.set(id);
    if (this.isBrowser) {
      try { globalThis.localStorage.setItem(LS_KEY, id); } catch { }
    }
    return id;
  }

  setAssistant(id: number) {
    this.assistantId.set(id);
  }
}
