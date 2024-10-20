# Paris Events Show - Next JS 14.x

Ce projet est une application web simple construite avec Next.js 14.2, qui affiche les événements se déroulant à Paris.
L'application récupère les données d'événements à partir d'une API publique et les présente de manière conviviale.
L'API est disponible à cette adresse :
[Open Data Paris](https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api/?disjunctive.tags&disjunctive.address_name&disjunctive.address_zipcode&disjunctive.address_city&disjunctive.pmr&disjunctive.blind&disjunctive.deaf&disjunctive.price_type&disjunctive.access_type&disjunctive.programs)

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Technologies utilisées](#technologies-utilisées)
- [Utilisation](#utilisation)
- [Licence](#licence)

## Prérequis

Avant d'installer et de lancer ce projet, assurez-vous d'avoir les éléments suivants installés sur votre système :

- Node.js (>=version 18.x )
- npm ou pnpm pour la gestion de paquets
- Un éditeur de code comme : VS Code, Sublime text, Web Storm, etc. (j'ai utilisé VS code)

## Installation

Voici les étapes de l'installation du projet :

### Clonner le projet

Clonez ce dépôt dans votre environnement local.

```bash
    git clone git clone https://github.com/eteka75/test-paris-events-2024.git
```

Déplacez-vous dans le projet

```bash
    cd test-paris-events-2024
```

Installer les dépendances

```bash
    pnpm install # ou pnpm i
```

ou si vous utilisé npm

```bash
    npm install # ou npm i
```

## Démarrage

Si vous finissez d'inbstaller les dépendances, vous pouvez lancer le projet en mode développement avec la commande suivante :

```bash
    pnpm run dev
```

ou si vous utilisé npm

```bash
    npm run dev
```

Le projet sera alors disponible à l'adresse suivante : [http://localhost:3000] (http://localhost:3000).

Au cas ou ce port est utilisé, un autre port choisit sera affiché dans la console, il vous suffira de copier et coller ce lien dans votre navigateur

## Utilisation

- Le site affichera une liste des événements disponibles à Paris.
- Vous pouvez effectuer des recherches par titre ou lieu, ainsi qu'appliquer des filtres.

## Technologies utilisées

- **Next.js - App Router 14.2 :** Framework React
- **React JS :** Bibliothèque JavaScript pour concevoir les interfaces
- **TypeScript :** Pour le typage des données
- **CSS Modules / TailwindCSS :** Pour le style des composants
- **Lucide :** Pour les icones des différents élements
- **API REST - Axios :** Pour récupérer les événements sur Paris

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](https://fr.wikipedia.org/wiki/Licence_MIT) pour plus de détails.
