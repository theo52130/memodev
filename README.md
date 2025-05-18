# 📚 MémoDev

## 📋 Description

MémoDev est une collection de fiches mémo interactives pour les développeurs. Ces fiches servent de référence rapide pour différents langages de programmation, frameworks et outils de développement.

## 📦 Contenu actuel

Le projet contient actuellement les fiches mémo suivantes :

- **🐘 PHP** : Langage de script côté serveur pour le développement web
- **💛 JavaScript** : Langage de programmation polyvalent pour le web
- **⚛️ React** : Bibliothèque JavaScript pour construire des interfaces utilisateur
- **🔼 Next.js** : Framework React pour la production
- **🌱 Git** : Système de contrôle de version distribué
- **🔹 Jujutsu** : Système de contrôle de version moderne et expérimental
- **🐳 Docker** : Plateforme de conteneurisation

## 🗂️ Structure du projet

```
├── memodev-electron/         # Application Electron
│   ├── package.json          # Configuration npm et dépendances
│   ├── src/                  # Code source
│   │   ├── main.js           # Point d'entrée Electron
│   │   ├── preload.js        # Script de préchargement
│   │   └── app/              # Contenu de l'application
│   │       ├── index.html    # Page d'accueil
│   │       └── memo/         # Dossier contenant les fiches mémo
│   │           ├── php_fiche_memo_interactive.html
│   │           ├── javascript_fiche_memo_interactive.html
│   │           ├── react_fiche_memo_interactive.html
│   │           ├── nextjs_fiche_memo_interactive.html
│   │           ├── git_fiche_memo_interactive.html
│   │           ├── jj_fiche_memo_interactive.html
│   │           ├── docker_fiche_memo_interactive.html
│   │           ├── css/      # Styles spécifiques pour chaque fiche
│   │           └── js/       # Scripts JavaScript
└── .jj/                      # Configuration du système de contrôle de version
```

## ✨ Fonctionnalités

- **🧭 Navigation intuitive** : Menu déroulant pour accéder rapidement aux différentes sections
- **💻 Exemples de code** : Extraits de code prêts à l'emploi
- **📱 Design responsive** : Adaptation à différentes tailles d'écran
- **🧩 Structure cohérente** : Organisation similaire pour toutes les fiches mémo
- **🖥️ Application desktop** : Disponible comme application via Electron

## 🚀 Installation

### Option 1 : Visualisation directe des fichiers HTML

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/theo52130/memodev.git
   ```

2. Ouvrez simplement le fichier `memodev-electron/src/app/index.html` dans votre navigateur web préféré.

### Option 2 : Utilisation avec Electron (recommandée)

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/theo52130/memodev.git
   ```

2. Naviguez vers le dossier de l'application Electron :
   ```bash
   cd memodev/memodev-electron
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez l'application :
   ```bash
   npm start
   ```

## 🔍 Utilisation

- 🏠 Accédez à la page d'accueil qui liste toutes les fiches mémo disponibles
- 📝 Sélectionnez la fiche mémo qui vous intéresse
- 📑 Utilisez le menu de navigation pour accéder rapidement aux différentes sections
- 📋 Copiez les exemples de code selon vos besoins
- 🔄 Revenez à l'accueil en utilisant le bouton de navigation

## 🛠️ Technologies utilisées

- 🌐 HTML5
- 🎨 CSS3
- ⚡ JavaScript vanilla
- 🖥️ Electron

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. 🍴 Forkez ce dépôt
2. 🌿 Créez une nouvelle branche (`git checkout -b feature/nouvelle-fiche`)
3. ✏️ Ajoutez votre contenu en suivant la structure existante
4. 💾 Committez vos changements (`git commit -m 'Ajout d'une fiche sur [Sujet]'`)
5. 📤 Poussez vers la branche (`git push origin feature/nouvelle-fiche`)
6. 🔄 Ouvrez une Pull Request

## 📅 Dernière mise à jour

Mai 2024
