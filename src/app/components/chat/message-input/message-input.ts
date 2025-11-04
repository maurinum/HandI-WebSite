import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  async send() {
    const t = this.text.trim();
    if (!t) return;


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

