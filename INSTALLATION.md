# Guide d'installation détaillé - H&I Website

## Étape 1 : Installation de Node.js

Si Node.js n'est pas installé sur votre machine :

### Windows
1. Téléchargez Node.js depuis https://nodejs.org/
2. Installez la version LTS (Long Term Support)
3. Vérifiez l'installation :
```bash
node --version
npm --version
```

### macOS
```bash
# Avec Homebrew
brew install node

# Vérification
node --version
npm --version
```

### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Vérification
node --version
npm --version
```

## Étape 2 : Télécharger le projet

Téléchargez et extrayez le dossier `hi-website` sur votre machine.

## Étape 3 : Installation des dépendances

Ouvrez un terminal dans le dossier du projet :

```bash
cd chemin/vers/hi-website
npm install
```

Cette commande va installer toutes les dépendances nécessaires (Angular, etc.).

## Étape 4 : Configuration YouTube (Optionnel mais recommandé)

### 4.1 Créer un projet Google Cloud

1. Allez sur https://console.cloud.google.com/
2. Cliquez sur "Créer un projet"
3. Donnez un nom à votre projet (ex: "HI-Website")
4. Cliquez sur "Créer"

### 4.2 Activer l'API YouTube

1. Dans le menu, allez dans "API et services" > "Bibliothèque"
2. Recherchez "YouTube Data API v3"
3. Cliquez dessus et activez-la

### 4.3 Créer une clé API

1. Allez dans "API et services" > "Identifiants"
2. Cliquez sur "Créer des identifiants" > "Clé API"
3. Copiez votre clé API

### 4.4 Obtenir votre Channel ID YouTube

1. Allez sur YouTube
2. Cliquez sur votre profil > "Votre chaîne"
3. L'URL ressemble à : `https://www.youtube.com/channel/VOTRE_CHANNEL_ID`
4. Copiez le Channel ID

### 4.5 Configuration dans le code

Éditez le fichier `src/app/services/youtube.ts` :

```typescript
// Ligne 12-13, remplacez par vos valeurs :
private API_KEY = 'AIzaSy...'; // Votre clé API
private CHANNEL_ID = 'UC...';  // Votre Channel ID

// Ligne 23-50, décommentez le code pour activer l'API
```

## Étape 5 : Lancer le site

### En mode développement

```bash
npm start
```

ou

```bash
ng serve
```

Le site sera accessible sur : http://localhost:4200

Le site se recharge automatiquement quand vous modifiez le code.

### Build pour la production

```bash
npm run build
```

Les fichiers compilés seront dans `dist/hi-website/browser/`

## Étape 6 : Personnalisation

### Modifier les textes

Les textes en français et arabe sont dans :
`src/app/services/language.ts`

### Modifier les couleurs

Les couleurs principales sont dans chaque fichier `.scss` :
- Gradient principal : `#667eea` et `#764ba2`
- Cherchez ces couleurs dans les fichiers SCSS et remplacez-les

### Modifier le logo

Le logo "H&I" est dans :
- Navbar : `src/app/components/navbar/navbar.html`
- Footer : `src/app/components/footer/footer.html`

### Ajouter votre propre contenu

Éditez les fichiers `.html` dans `src/app/components/` :
- `home/` : Page d'accueil
- `features/` : Page fonctionnalités
- `pricing/` : Page tarifs
- `contact/` : Page contact

### Configurer le formulaire de contact

Éditez `src/app/components/contact/contact.ts` :

```typescript
onSubmit() {
  // Exemple avec une API
  fetch('https://votre-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.contactForm)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    this.submitted = true;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
```

## Étape 7 : Déploiement

### Option 1 : Netlify (Gratuit et simple)

1. Créez un compte sur https://netlify.com
2. Installez Netlify CLI :
```bash
npm install -g netlify-cli
```
3. Build et déployez :
```bash
npm run build
netlify deploy --prod --dir=dist/hi-website/browser
```

### Option 2 : Vercel (Gratuit et simple)

1. Créez un compte sur https://vercel.com
2. Installez Vercel CLI :
```bash
npm install -g vercel
```
3. Déployez :
```bash
npm run build
vercel --prod
```

### Option 3 : Serveur traditionnel (Apache/Nginx)

1. Build le projet :
```bash
npm run build
```

2. Copiez le contenu de `dist/hi-website/browser/` vers votre serveur

3. Configuration Apache (.htaccess) :
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. Configuration Nginx :
```nginx
server {
  listen 80;
  server_name votre-domaine.com;
  root /var/www/hi-website;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Problèmes courants

### Erreur : "ng: command not found"

Solution :
```bash
npm install -g @angular/cli
```

### Erreur lors de l'installation des dépendances

Solution :
```bash
# Supprimez node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstallez
npm install
```

### Le site ne charge pas les styles

Solution :
- Vérifiez que vous avez bien lancé `npm start`
- Videz le cache du navigateur (Ctrl+Shift+R)

### Les vidéos YouTube ne s'affichent pas

Vérifiez :
1. Que vous avez configuré la clé API
2. Que l'API YouTube Data v3 est activée
3. Que le Channel ID est correct
4. Qu'il n'y a pas d'erreurs dans la console du navigateur (F12)

## Support

En cas de problème :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez le terminal où tourne `npm start`
3. Consultez la documentation Angular : https://angular.dev

## Ressources utiles

- Documentation Angular : https://angular.dev
- Documentation Onyx : https://docs.onyx.app
- Google Fonts : https://fonts.google.com
- YouTube API : https://developers.google.com/youtube/v3

---

Bon développement ! 🚀
