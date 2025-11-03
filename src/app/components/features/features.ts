import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class FeaturesComponent {
  langService = inject(LanguageService);

  translate(key: string): string {
    return this.langService.translate(key);
  }

  features = [
    {
      icon: '💬',
      titleKey: 'features.chat.title',
      descKey: 'features.chat.desc',
      details: 'Interface intuitive pour interagir avec vos modèles de langage préférés. Support de conversations multi-tours avec historique complet et contexte préservé.'
    },
    {
      icon: '🤖',
      titleKey: 'features.agents.title',
      descKey: 'features.agents.desc',
      details: 'Construisez des agents IA avec des instructions personnalisées, des bases de connaissances spécifiques et des actions automatisées adaptées à vos processus métier.'
    },
    {
      icon: '🔍',
      titleKey: 'features.search.title',
      descKey: 'features.search.desc',
      details: 'Recherche hybride avancée combinant similarité vectorielle et algorithmes propriétaires pour des résultats pertinents. Plus de 40 intégrations disponibles.'
    },
    {
      icon: '🌐',
      titleKey: 'features.web.title',
      descKey: 'features.web.desc',
      details: 'Accès aux informations en temps réel depuis Internet pour enrichir les réponses de vos agents IA avec les données les plus récentes.'
    },
    {
      icon: '🔒',
      titleKey: 'features.secure.title',
      descKey: 'features.secure.desc',
      details: 'Hébergement sur vos propres serveurs ou cloud privé. Vos données ne quittent jamais votre infrastructure. Conformité RGPD garantie et chiffrement de bout en bout.'
    },
    {
      icon: '⚡',
      title: 'Technologie Propriétaire',
      desc: 'Solution développée et optimisée pour la performance',
      details: 'Plateforme développée par nos équipes avec des optimisations exclusives pour offrir des performances exceptionnelles et une fiabilité maximale.'
    },
    {
      icon: '🔄',
      title: 'Intégrations Complètes',
      desc: 'Connectez tous vos outils favoris',
      details: 'Salesforce, HubSpot, Zendesk, Google Drive, Slack, Teams et plus de 40 autres intégrations natives pour une adoption fluide dans votre écosystème.'
    },
    {
      icon: '🎯',
      title: 'Multi-LLM Intelligent',
      desc: 'Le meilleur modèle pour chaque tâche',
      details: 'Support natif d\'OpenAI (GPT-4), Anthropic (Claude), Mistral, DeepSeek. Sélection automatique du modèle optimal selon le contexte.'
    },
    {
      icon: '📊',
      title: 'Analytics Avancés',
      desc: 'Mesurez et optimisez vos performances',
      details: 'Tableaux de bord détaillés, métriques d\'utilisation, analyse des performances des agents et ROI mesurable pour piloter votre stratégie IA.'
    }
  ];
}
