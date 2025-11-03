import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantService } from '../../../services/assistant.service';
import { ChatSessionService } from '../../../services/chat-session.service';

@Component({
  selector: 'app-assistant-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assistant-picker.html',
  styleUrl: './assistant-picker.scss',
})
export class AssistantPickerComponent {
  @Output() changed = new EventEmitter<number>();
  selectedId = 0;

  constructor(public asst: AssistantService, private sessions: ChatSessionService) { }

  ngOnInit() {
    this.asst.refresh(); // load assistants list
    this.selectedId = this.sessions.assistantId(); // restore last selected
  }

  choose(id: number) {
    this.selectedId = id;
    this.sessions.setAssistant(id); // ✅ update current assistant
    this.changed.emit(id);
  }
}

