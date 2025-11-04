import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  langService = inject(LanguageService);
  isMenuOpen = false;
  isLangDropdownOpen = false;
  languages: Array<'en' | 'fr' | 'ar'> = ['en', 'fr', 'ar'];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  selectLanguage(lang: 'en' | 'fr' | 'ar') {
    this.langService.setLanguage(lang);
    this.isLangDropdownOpen = false;
  }
  
  translate(key: string): string {
    return this.langService.translate(key);
  }
  
  getLanguageName(lang: 'en' | 'fr' | 'ar'): string {
    return this.langService.getLanguageName(lang);
  }
}
