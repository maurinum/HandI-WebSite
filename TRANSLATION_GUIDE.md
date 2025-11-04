# Guide de Traduction - H&I Website

## 🌐 Système de Traduction Multilingue

Le site web H&I supporte maintenant **3 langues** :
- 🇬🇧 **English (EN)**
- 🇫🇷 **Français (FR)**
- 🇸🇦 **العربية (AR)**

## 📋 Fonctionnalités Implémentées

### 1. **Dropdown de Sélection de Langue**
- Situé dans la navbar en haut à droite
- Affiche l'icône 🌐 et le nom de la langue actuelle
- Menu déroulant avec les 3 langues disponibles
- La langue active est mise en surbrillance

### 2. **Service de Traduction Centralisé**
- Fichier : `src/app/services/language.ts`
- Toutes les traductions sont centralisées dans un seul endroit
- Méthodes disponibles :
  - `translate(key: string)` : Traduit une clé
  - `setLanguage(lang)` : Change la langue
  - `getLanguageName(lang)` : Obtient le nom de la langue
  - `currentLang()` : Signal de la langue actuelle

### 3. **Support RTL pour l'Arabe**
- Direction du texte automatiquement changée en RTL pour l'arabe
- Attribut `dir` du document mis à jour automatiquement

## 🔑 Clés de Traduction Disponibles

### Navigation
- `nav.home`, `nav.features`, `nav.videos`, `nav.pricing`, `nav.contact`

### Hero Section
- `hero.title`, `hero.subtitle`, `hero.cta`, `hero.demo`

### Intelligence Section
- `intelligence.title`, `intelligence.subtitle`
- `intelligence.engagement`, `intelligence.connectors`, `intelligence.timesaved`

### Features
- `features.title`
- `features.chat.title`, `features.chat.desc`
- `features.agents.title`, `features.agents.desc`
- `features.search.title`, `features.search.desc`
- `features.web.title`, `features.web.desc`
- `features.secure.title`, `features.secure.desc`
- `features.proprietary.title`, `features.proprietary.desc`

### Home Page
- `home.features.tag`, `home.features.subtitle`, `home.features.learnmore`, `home.features.discover`
- `home.why.tag`, `home.why.title`, `home.why.subtitle`
- `home.why.tech.title`, `home.why.tech.desc`
- `home.why.security.title`, `home.why.security.desc`
- `home.why.multimodel.title`, `home.why.multimodel.desc`
- `home.why.support.title`, `home.why.support.desc`
- `home.why.agents`, `home.why.integrations`, `home.why.faster`

### Footer
- `footer.about`, `footer.description`, `footer.links`, `footer.rights`
- `footer.resources`, `footer.documentation`, `footer.guide`, `footer.api`, `footer.blog`, `footer.support`
- `footer.legal`, `footer.privacy`, `footer.terms`, `footer.cookies`, `footer.gdpr`

### Videos, Pricing, Contact
- `videos.title`, `videos.subtitle`
- `pricing.title`, `pricing.subtitle`, `pricing.starter`, `pricing.pro`, `pricing.enterprise`
- `pricing.month`, `pricing.contact`, `pricing.choose`
- `contact.title`, `contact.subtitle`, `contact.name`, `contact.email`, `contact.message`, `contact.send`

## 💻 Comment Utiliser dans les Composants

### 1. Dans le TypeScript (.ts)
```typescript
import { LanguageService } from '../../services/language';

export class MyComponent {
  langService = inject(LanguageService);
  
  translate(key: string): string {
    return this.langService.translate(key);
  }
}
```

### 2. Dans le Template (.html)
```html
<h1>{{ translate('hero.title') }}</h1>
<p>{{ translate('hero.subtitle') }}</p>
```

### 3. Changer la Langue Programmatiquement
```typescript
this.langService.setLanguage('fr'); // ou 'en' ou 'ar'
```

## 🎨 Style du Dropdown

Le dropdown de langue est stylé avec :
- Gradient violet/rose cohérent avec le thème du site
- Animation de rotation de la flèche
- Effet hover sur les options
- Option active mise en surbrillance

## ✅ Composants Traduits

- ✅ **Navbar** : Navigation + dropdown de langue
- ✅ **Home** : Hero, Intelligence, Features, Why Choose Us
- ✅ **Footer** : Tous les liens et textes
- ✅ **Features** : Titres et descriptions
- ✅ **Videos** : Titre et sous-titre
- ✅ **Pricing** : Plans et labels
- ✅ **Contact** : Formulaire et labels

## 🔄 Ajouter une Nouvelle Traduction

1. Ouvrir `src/app/services/language.ts`
2. Ajouter la clé dans l'objet `translations` :
```typescript
'ma.nouvelle.cle': { 
  en: 'English text', 
  fr: 'Texte français', 
  ar: 'النص العربي' 
}
```
3. Utiliser dans le template : `{{ translate('ma.nouvelle.cle') }}`

## 🚀 Prochaines Étapes

Pour ajouter d'autres pages ou sections :
1. Ajouter les traductions dans `language.ts`
2. Injecter `LanguageService` dans le composant
3. Utiliser `translate()` dans le template
4. Tester avec les 3 langues

---

**Note** : Toutes les traductions sont maintenant centralisées et le système change automatiquement TOUT le contenu du site selon la langue sélectionnée.
