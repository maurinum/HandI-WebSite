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
    
    // Force l'utilisation de l'assistant 'Memoact'
    // Attendre que les assistants soient chargés puis sélectionner Memoact
    const checkAssistants = setInterval(() => {
      const memoactAssistant = this.asst.assistants().find(a => 
        a.name.toLowerCase().includes('memoact')
      );
      
      if (memoactAssistant) {
        this.selectedId = memoactAssistant.id;
        this.sessions.setAssistant(memoactAssistant.id);
        this.changed.emit(memoactAssistant.id);
        clearInterval(checkAssistants);
        console.log("assistant utilise :","memoact")
      } else if (!this.asst.loading() && this.asst.assistants().length > 0) {
        // Si Memoact n'est pas trouvé, utiliser le premier assistant
        this.selectedId = this.asst.assistants()[0].id;
        this.sessions.setAssistant(this.asst.assistants()[0].id);
        this.changed.emit(this.asst.assistants()[0].id);
        clearInterval(checkAssistants);
        console.log("assistant utilise :",this.asst.assistants()[0].name)
      }
    }, 100);
    
    // Nettoyer après 5 secondes si toujours pas trouvé
    setTimeout(() => clearInterval(checkAssistants), 5000);
  }

  // Fonction choose commentée - plus utilisée car assistant fixe
  /* choose(id: number) {
    this.selectedId = id;
    this.sessions.setAssistant(id); // ✅ update current assistant
    this.changed.emit(id);
  } */
}

