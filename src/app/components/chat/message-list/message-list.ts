import { AfterViewInit, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageListComponent implements AfterViewInit {
  private chat = inject(ChatService);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('scrollArea', { static: true }) scrollArea!: ElementRef<HTMLElement>;
  @ViewChild('bottomAnchor', { static: true }) bottomAnchor!: ElementRef<HTMLElement>;

  messages = this.chat.messages;

  ngAfterViewInit() {
    queueMicrotask(() => this.scrollToBottom());

    effect(() => {
      this.messages();
      queueMicrotask(() => this.scrollToBottom());
    });
  }

  private scrollToBottom() {
    const area = this.scrollArea?.nativeElement;
    if (!area) return;
    area.scrollTop = area.scrollHeight;
  }

  track = (_: number, m: any) => m.id;

  bubbleClass(role: 'user' | 'assistant' | 'system') {
    return role === 'user' ? 'hi-bubble hi-right' : 'hi-bubble hi-left';
  }

  // Format markdown-like text to HTML
  // Format markdown-like text to HTML
  formatMessage(text: string): SafeHtml {
    let html = text
      // Escape HTML first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

      // Citations [[[1]](url)] -> clickable superscript number
      .replace(/\[\[\[(\d+)\]\]\((https?:\/\/[^\)]+)\)\]/g,
        '<sup><a href="$2" target="_blank" rel="noopener noreferrer" class="citation-link">[$1]</a></sup>')

      // Regular links [text](url) -> clickable text
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="regular-link">$1</a>')

      // Headers (must come before bold)
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')

      // Remove empty brackets []
      .replace(/\[\]/g, '')
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // Italic *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')

      // Code `code`
      .replace(/`([^`]+)`/g, '<code>$1</code>')

      // Line breaks
      .replace(/\n/g, '<br>');

    return this.sanitizer.sanitize(1, html) || '';
  }
}
