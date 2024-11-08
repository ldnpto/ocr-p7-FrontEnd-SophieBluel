# Presentation du projet 7 - Créez une page web dynamique avec JavaScript

En tant que développeur front-end de l’agence ArchiWebos, je dispose de la maquette Figma, du code back-end, du front-end et d'un Kanban pour les tâches qui me sont attribuées à savoir le développemnt de :

* la page de présentation des travaux de l'architecte (à partir du HTML fourni) ;
* la page de connexion de l'administrateur du site (le client) (code à créer de zéro) ;
* la modale permettant d'uploader de nouveaux médias (code à créer de zéro).

## Démarrage

* clone du dépôt de code dans GitHub [https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel](https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel).
* lancement du back-end dans une session VS Code `npm  start`
* tests du back-end avec PostMan
* lancement du front-end dans une autre session VS Code

## Développements

### 1 - mise à jour de la gallerie dynamiquement
récupération des travaux depuis le back-end en méthode GET via l'url [http://localhost:5678/api/works](http://localhost:5678/api/works) et ajout des éléments HTML en javascript
### 2 - création des boutons catégories et filtrage de la gallerie
récupération des catégories depuis le back-end en méthode GET via l'url [http://localhost:5678/api/categories](http://localhost:5678/api/categories) et ajout des boutons permettant de filtrer la gallerie par catégorie
### 3 - page de connexion et gestion de l'authentification
ajout d'une page de connexion login.html gérant le format du mot de passe, l'authentification en erreur, et l'authentification correcte renvoyant un jeton stocké dans le localStorage du navigateur avec redirection vers la page d'accueil
### 4 - mode édition sur la page d'accueil et vérification du jeton
gestion du mode édition sur la page d'accueil lorsqu'un jeton valide est présent (à l'expiration du jeton, le jeton est supprimé)
### 5 développement de la modale
#### 5.1 overlay et modale de suppression de travaux
ajout de l'overlay et de la modale de suppression de travaux existants (rafraichissement de l'affichage des travaux à chaque suppression dans la modale et la gallerie de la page d'accueil)
#### 5.2 modale d'ajout de travaux
ajout de la modale d'ajout de nouveaux travaux, et gestion des champs obligatoires du formulaire avec le bouton de validation, et rafraichissement de la gallerie


## Publication dans GitHub
### Synchronisation des sources avec un dépôt GitHub 
### Publication du site avec GitHub pages
### Publication de la documentation avec MKDocs

## Conclusion
### Apprentissage
Les cours précédents m'ont permis d'être rapidement autonome sur la création en javascript, css à partir de la maquette.
L'utilisation de template m'a fait gagné du temps pour la mise en forme des modales, et les comportements dynamiques
Les algorithmes de récupération des données à partir des APIs ont été facilement implémentés, en mettant à profit GitHub Copilot
Les étapes du projet sont bien détaillées ce qui permet d'avancer progressivement
### Difficultés rencontrées
La difficulté principale a été de bien mettre en forme les éléments dans la modale, ce qui nécessite de nombreux ajustements CSS pour obtenir un rendu fidèle à la maquette
