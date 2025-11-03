# H&I - Humanité et Intelligence Artificielle

Site web moderne pour la plateforme H&I, basé sur Onyx (anciennement Danswer), avec support bilingue (Français/Arabe) et intégration YouTube.

## 🚀 Fonctionnalités

- ✨ Design moderne et responsive
- 🌐 Support bilingue (Français/Arabe avec RTL)
- 🎥 Intégration YouTube automatique
- 🎨 Animations fluides
- 📱 Mobile-first
- ⚡ Performances optimisées avec Angular 19

## 📋 Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn

## 🛠️ Installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances**
```bash
cd hi-website
npm install
```

3. **Configurer l'intégration YouTube** (Optionnel)

Éditez le fichier `src/app/services/youtube.ts` :
```typescript
private API_KEY = 'VOTRE_CLE_API_YOUTUBE';
private CHANNEL_ID = 'VOTRE_CHANNEL_ID';
```

Pour obtenir ces informations :
- Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
- Créez un projet
- Activez l'API YouTube Data v3
- Créez une clé API
- Récupérez l'ID de votre chaîne YouTube

## 🚀 Lancement du projet

### Mode développement
```bash
npm start
# ou
ng serve
```

Le site sera accessible sur `http://localhost:4200`

### Build de production
```bash
npm run build
# ou
ng build
```

Les fichiers de production seront dans le dossier `dist/`

## 📁 Structure du projet

```
hi-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/          # Page d'accueil
│   │   │   ├── features/      # Page fonctionnalités
│   │   │   ├── videos/        # Page vidéos YouTube
│   │   │   ├── pricing/       # Page tarifs
│   │   │   ├── contact/       # Page contact
│   │   │   ├── navbar/        # Navigation
│   │   │   └── footer/        # Pied de page
│   │   ├── services/
│   │   │   ├── language.ts    # Gestion des langues
│   │   │   └── youtube.ts     # Intégration YouTube
│   │   ├── app.routes.ts      # Configuration des routes
│   │   └── app.ts             # Composant principal
│   ├── styles.scss            # Styles globaux
│   └── index.html             # HTML principal
└── package.json
```

## 🎨 Personnalisation

### Modifier les couleurs
Les couleurs principales sont définies dans les fichiers SCSS :
- Gradient principal : `#667eea` → `#764ba2`
- Ces couleurs peuvent être modifiées dans chaque fichier `.scss`

### Ajouter des traductions
Éditez `src/app/services/language.ts` pour ajouter ou modifier les traductions.

### Modifier le contenu
Chaque composant a son propre fichier `.html` où vous pouvez modifier le contenu.

## 🌐 Changement de langue

Le site supporte le français et l'arabe. Le bouton de changement de langue est dans la navbar.
Le changement de langue active automatiquement le mode RTL (right-to-left) pour l'arabe.

## 📧 Configuration du formulaire de contact

Le formulaire de contact dans `src/app/components/contact/contact.ts` peut être configuré pour envoyer les données vers votre backend :

```typescript
onSubmit() {
  // Ajoutez ici votre logique d'envoi (API, email, etc.)
  console.log('Form submitted:', this.contactForm);
}
```

## 🎥 Ajout automatique de vidéos YouTube

Une fois la clé API configurée, les vidéos de votre chaîne seront automatiquement récupérées et affichées sur la page `/videos`.

Pour forcer le rechargement des vidéos :
```typescript
// Dans src/app/services/youtube.ts
await this.loadVideos();
```

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à toutes les tailles d'écran :
- Desktop (>1200px)
- Tablet (768px - 1200px)
- Mobile (<768px)

## 🚀 Déploiement

### Déploiement sur Netlify/Vercel
1. Build le projet : `npm run build`
2. Déployez le contenu du dossier `dist/hi-website/browser/`

### Déploiement sur un serveur Apache/Nginx
1. Build le projet : `npm run build`
2. Copiez le contenu de `dist/hi-website/browser/` vers votre serveur
3. Configurez votre serveur pour router toutes les requêtes vers `index.html`

## 🤝 Support

Pour toute question ou problème :
- Email : contact@hi-platform.com
- Documentation Onyx : https://docs.onyx.app

## 📄 Licence

Ce projet est basé sur Onyx (open source).

## 🎉 Crédits

- Basé sur [Onyx](https://github.com/onyx-dot-app/onyx)
- Design inspiré de [Hymalaia](https://www.hymalaia.com/)
- Développé avec Angular 19

---
