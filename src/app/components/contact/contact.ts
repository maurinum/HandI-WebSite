import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { EmailService } from '../../services/email.service';
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
  emailService = inject(EmailService);

  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  };

  submitted = false;
  isLoading = false;
  errorMessage = '';
  
  translate(key: string): string {
    return this.langService.translate(key);
  }

  async onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.submitted = false;

    try {
      const result = await this.emailService.sendContactForm(this.contactForm);
      
      if (result.success) {
        this.submitted = true;
        // Reset form data but keep submitted state true
        this.contactForm = {
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        };
      } else {
        this.errorMessage = result.message;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isLoading = false;
    }
  }
}
