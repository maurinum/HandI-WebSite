import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // EmailJS configuration
  // You need to replace these with your actual EmailJS credentials
  private serviceId = 'service_2rh9n0f';
  private templateId = 'template_ru0uzw8';
  private publicKey = 'MKrePQcr594VYx3J_';

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  async sendContactForm(formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        to_email: 'contact@memoactai.com'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Email sent successfully!'
        };
      } else {
        return {
          success: false,
          message: 'Failed to send email. Please try again.'
        };
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'An error occurred while sending the email. Please try again later.'
      };
    }
  }
}
