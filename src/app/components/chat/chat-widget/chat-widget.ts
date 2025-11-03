import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSessionService } from '../../../services/chat-session.service';
import { ChatService } from '../../../services/chat.service';
import { ChatPanelComponent } from '../chat-panel/chat-panel';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, ChatPanelComponent],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss',
})

export class ChatWidgetComponent {
  open = signal(false);
  sessionId = signal<string | null>(null);

  constructor(
    private sessions: ChatSessionService,
    private chat: ChatService
  ) {
    // If session already exists, reuse it
    const existing = this.sessions.get();
    if (existing) {
      this.sessionId.set(existing);
      this.chat.loadSession(existing);
    }

    // When user opens the chat for the first time, ensure one exists
    effect(async () => {
      if (this.open() && !this.sessionId()) {
        const id = await this.sessions.ensureSession();
        this.sessionId.set(id);
        this.chat.loadSession(id);
      }
    });
  }

  toggle() {
    this.open.update(v => !v);
  }
}