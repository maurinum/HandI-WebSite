import { Component, inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  langService = inject(LanguageService);
  private observer?: IntersectionObserver;

  features = [
    {
      icon: '💬',
      titleKey: 'features.chat.title',
      descKey: 'features.chat.desc'
    },
    {
      icon: '🤖',
      titleKey: 'features.agents.title',
      descKey: 'features.agents.desc'
    },
    {
      icon: '🔍',
      titleKey: 'features.search.title',
      descKey: 'features.search.desc'
    },
    {
      icon: '🌐',
      titleKey: 'features.web.title',
      descKey: 'features.web.desc'
    },
    {
      icon: '🔒',
      titleKey: 'features.secure.title',
      descKey: 'features.secure.desc'
    },
    {
      icon: '⚡',
      titleKey: 'features.proprietary.title',
      descKey: 'features.proprietary.desc'
    }
  ];

  ngOnInit() {
    // Configuration de l'Intersection Observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // L'élément doit être visible à 15% pour déclencher l'animation
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ajouter la classe quand l'élément entre dans le viewport
          entry.target.classList.add('is-visible');
        } else {
          // Retirer la classe quand l'élément sort du viewport
          entry.target.classList.remove('is-visible');
        }
      });
    }, options);
  }

  ngAfterViewInit() {
    // Observer tous les éléments avec la classe 'scroll-reveal'
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach(el => {
        this.observer?.observe(el);
      });
    }, 100);
  }

  ngOnDestroy() {
    // Nettoyer l'observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  translate(key: string): string {
    return this.langService.translate(key);
  }
}
