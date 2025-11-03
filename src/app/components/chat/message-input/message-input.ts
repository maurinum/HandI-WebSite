import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { ChatSessionService } from '../../../services/chat-session.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
})
export class MessageInputComponent {
  @Output() sent = new EventEmitter<string>();
  text = '';

  constructor(private chat: ChatService, private sessions: ChatSessionService) { }

  async send() {
    const t = this.text.trim();
    if (!t) return;

    // Ensure session exists
    const sessionId = await this.sessions.ensureSession();

    // Use currently selected assistant
    const assistantId = this.sessions.assistantId();

    this.chat.send(sessionId, t, assistantId);

    this.sent.emit(t);
    this.text = '';
  }

  enter(e: Event) {
    const ke = e as KeyboardEvent;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.send();
    }
  }
}

