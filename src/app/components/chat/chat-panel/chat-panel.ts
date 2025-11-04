import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { ChatSessionService } from '../../../services/chat-session.service';
import { MessageListComponent } from '../message-list/message-list';
import { MessageInputComponent } from '../message-input/message-input';
import { AssistantPickerComponent } from '../assistant-picker/assistant-picker';
import { TypingIndicator } from '../typing-indicator/typing-indicator';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [
    CommonModule,
    MessageListComponent,
    MessageInputComponent,
    AssistantPickerComponent,
    TypingIndicator
  ],
  templateUrl: './chat-panel.html',
  styleUrl: './chat-panel.scss',
})
export class ChatPanelComponent {
  @Input() sessionId!: string | null;
  @Output() close = new EventEmitter<void>();
  @ViewChild('messagesArea') messagesArea!: ElementRef<HTMLElement>;

  private chat = inject(ChatService);
  private sessions = inject(ChatSessionService);

  /** ✅ Expose typing signal to the template */
  get typing() {
    return this.chat.isTyping();  // assumes ChatService has a signal isTyping = signal<boolean>(false)
  }

  onAssistant(assistantId: number) {
    this.sessions.setAssistant(assistantId);
  }

  onSend(text: string) {
    console.log("text",text)
    if (!this.sessionId) return;
    const assistantId = this.sessions.assistantId();
    this.chat.send(this.sessionId, text, assistantId);
    // Scroll after sending
    setTimeout(() => this.scrollToBottom(), 100);
  }

  private scrollToBottom() {
    const el = this.messagesArea?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}