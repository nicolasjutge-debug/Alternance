# Radar Alternance — BTS SIO SISR Rennes

## Fichiers du dossier
- `index.html` — l'application
- `manifest.json` — déclaration PWA (nom, icônes, couleurs)
- `sw.js` — service worker (mise en cache pour un accès hors-ligne à l'app)
- `icon-512.png`, `icon-192.png`, `apple-touch-icon.png`, `icon-32.png` — icônes générées depuis `icon.png`

Tous les fichiers doivent rester **au même niveau, dans le même dossier** (les chemins dans `index.html` et `manifest.json` sont relatifs).

## Déployer sur GitHub Pages (sans ligne de commande)
1. Sur [github.com](https://github.com), clique **New repository**. Nom libre (ex. `radar-alternance`), coche **Public** (nécessaire pour Pages gratuit), crée-le.
2. Dans le repo vide, clique **Add file → Upload files**, glisse les 7 fichiers ci-dessus, puis **Commit changes**.
3. Va dans **Settings → Pages**. Sous *Build and deployment*, choisis **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
4. Attends ~1 minute, rafraîchis la page : l'URL publique apparaît en haut (ex. `https://ton-pseudo.github.io/radar-alternance/`).

## Installer en app (une fois en ligne)
- **iPhone** : ouvre l'URL dans Safari → bouton Partager → **Sur l'écran d'accueil**. L'icône et le nom sont maintenant corrects, et l'app s'ouvre en plein écran comme une vraie app.
- **PC (Chrome/Edge)** : ouvre l'URL → une icône d'installation apparaît dans la barre d'adresse → **Installer**.

## Important — le bouton "Scanner maintenant (IA)"
Publier sur GitHub Pages rend l'app installable proprement, **mais ne change rien** pour ce bouton IA : il continue à ne fonctionner que si ce fichier est ouvert comme artifact vivant dans Claude.ai. Hébergé sur GitHub Pages (ou installé en PWA), le bouton affichera son message d'erreur habituel si tu cliques dessus — c'est attendu, pas un bug de l'hébergement.

## Le vrai scan sans Claude : le widget "Offres en direct"
Nouvelle section sur la page, juste au-dessus des annonces : un widget officiel de **La bonne alternance** (service public), intégré en iframe. Il charge de vraies offres à jour à chaque ouverture de la page — aucune clé, aucun compte, aucune configuration, et ça marche identiquement en local, sur GitHub Pages ou en PWA installée. C'est la réponse à « il faut que ça marche sans passer par une conversation Claude ». Rien à faire de ton côté, il fonctionne dès l'upload.
