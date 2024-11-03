# Paris Events Show - Next JS 14.x

Ce projet est une application web simple construite avec Next.js 14.2, qui affiche les événements se déroulant à Paris.
L'application récupère les données d'événements à partir d'une API publique dénommée **"Open Data Paris"** et les présente de manière conviviale.
Vous pouvez accéder à l'API en cliquant sur ce lien ci-dessous :  
[Open Data Paris](https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api/?disjunctive.tags&disjunctive.address_name&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.pmr&disjunctive.blind&disjunctive.deaf&disjunctive.price_type&disjunctive.access_type&disjunctive.programs)

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Fonctionnement](#fonctionnement)
- [Technologies utilisées](#technologies-utilisées)
- [Licence](#licence)

## Prérequis

Avant d'installer et de lancer ce projet, assurez-vous d'avoir les éléments suivants installés sur votre système :

- Node.js (>=version 18.x)
- npm ou pnpm pour la gestion de paquets
- Un éditeur de code comme : VS Code, Sublime Text, WebStorm, etc. (j'ai utilisé VS Code)

## Installation

Voici les étapes de l'installation du projet :

**1- Cloner le projet**

Clonez ce dépôt dans votre environnement local.

```bash
git clone https://github.com/eteka75/test-paris-events-2024.git
```

**2- Déplacez-vous dans le projet**

```bash
    cd test-paris-events-2024
```

**3- Installer les dépendances**

```bash
    pnpm install # ou pnpm i
```

ou si vous utilisé npm

```bash
    npm install # ou npm i
```

**4- Lancer le projet**

Si vous finissez d'inbstaller les dépendances, vous pouvez lancer le projet en mode développement avec la commande suivante :

```bash
    pnpm run dev
```

ou si vous utilisé npm

```bash
    npm run dev
```

Le projet sera alors disponible à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

Au cas où ce port est utilisé, un autre port choisi sera affiché dans la console ; il vous suffira de copier et coller ce lien dans votre navigateur.

## Fonctionnement

- Le site affichera une liste des événements disponibles à Paris.
- Vous pouvez effectuer des recherches par titre ou lieu. Vous pouvez également appliquer des filtres (type, date, tri, etc.).
- Des suggestions du TOP 4 des quartiers populaires de Paris sont affichées pour faciliter l'expérience utilisateur.
- Vous pouvez parcourir les événements par page et choisir le nombre d'événements que vous souhaitez afficher.

## Technologies utilisées

- **Next.js - App Router 14.2 :** Framework React
- **React JS :** Bibliothèque JavaScript pour concevoir les interfaces
- **TypeScript :** Gestion du typage des données.
- **CSS Modules / TailwindCSS / Sadcn UI :** Pour la mise en forme des composants.
- **Lucide :** Usage d'icones sur différents composants.
- **API REST - Axios :** Pour récupérer les événements sur Paris.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](https://fr.wikipedia.org/wiki/Licence_MIT) pour plus de détails.

A très vite ! 🤗
