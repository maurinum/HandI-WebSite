import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {
  langService = inject(LanguageService);

  translate(key: string): string {
    return this.langService.translate(key);
  }

  plans = [
    {
      name: 'Starter',
      nameKey: 'pricing.starter',
      price: '99€',
      period: '/mois',
      periodKey: 'pricing.month',
      features: [
        'Jusqu\'à 5 utilisateurs',
        '10 agents IA personnalisés',
        '5 Go de stockage',
        'Support par email',
        'Intégrations de base',
        'Mises à jour régulières'
      ],
      color: '#667eea',
      popular: false
    },
    {
      name: 'Professionnel',
      nameKey: 'pricing.pro',
      price: '299€',
      period: '/mois',
      periodKey: 'pricing.month',
      features: [
        'Jusqu\'à 25 utilisateurs',
        'Agents IA illimités',
        '50 Go de stockage',
        'Support prioritaire',
        'Toutes les intégrations',
        'API complète',
        'Personnalisation avancée',
        'Formation incluse'
      ],
      color: '#764ba2',
      popular: true
    },
    {
      name: 'Enterprise',
      nameKey: 'pricing.enterprise',
      price: 'Sur mesure',
      period: '',
      periodKey: '',
      features: [
        'Utilisateurs illimités',
        'Infrastructure dédiée',
        'Stockage illimité',
        'Support 24/7',
        'SLA garanti',
        'Déploiement on-premise',
        'Développement personnalisé',
        'Account manager dédié'
      ],
      color: '#f093fb',
      popular: false
    }
  ];
}
