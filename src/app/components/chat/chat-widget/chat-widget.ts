import { Component, effect, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChatSessionService } from '../../../services/chat-session.service';
import { ChatService } from '../../../services/chat.service';
import { LanguageService } from '../../../services/language';
import { ChatPanelComponent } from '../chat-panel/chat-panel';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, ChatPanelComponent],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})

export class ChatWidgetComponent implements OnInit, OnDestroy {
  open = signal(false);
  sessionId = signal<string | null>(null);
  showNotification = signal(true);
  private notificationTimeout: any;

  constructor(
    private sessions: ChatSessionService,
    private chat: ChatService,
    public langService: LanguageService
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

  ngOnInit() {
    // Hide notification after 10 seconds if user doesn't scroll
    this.notificationTimeout = setTimeout(() => {
      this.showNotification.set(false);
    }, 100000);
  }

  ngOnDestroy() {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Hide notification when user scrolls
    if (window.scrollY > 100) {
      this.showNotification.set(false);
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout);
      }
    }
  }

  toggle() {
    this.open.update(v => !v);
    // Hide notification when chat is opened
    this.showNotification.set(false);
  }
}