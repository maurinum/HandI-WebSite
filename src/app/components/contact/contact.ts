import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  langService = inject(LanguageService);

  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  };

  submitted = false;
  
  translate(key: string): string {
    return this.langService.translate(key);
  }

  onSubmit() {
    // Ici vous pouvez ajouter l'envoi du formulaire à votre backend
    console.log('Form submitted:', this.contactForm);
    this.submitted = true;
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      this.submitted = false;
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      };
    }, 3000);
  }
}
