import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hi-typing" role="status" aria-live="polite" *ngIf="show">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  `,
  styleUrl: './typing-indicator.scss',
})
export class TypingIndicator {
  @Input() show = false;
}
