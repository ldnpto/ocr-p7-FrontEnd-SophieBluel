# Presentation du projet 7

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

### 1 - récupération des travaux depuis le back-end en méthode GET via l'url [http://localhost:5678/api/works](http://localhost:5678/api/works) et ajout des éléments HTML en javascript
### 2 - récupération des catagories depuis le back-end en méthode GET via l'url [http://localhost:5678/api/categories](http://localhost:5678/api/categories) et ajout des boutons permettant de filtrer la gallerie par catégorie
### 3 - ajout d'une page de connexion login.html gérant le format du mot de passe, l'authentification en erreur, et l'authentification correcte renvoyant un jeton stocké dans le localStorage du navigateur avec redirection vers la page d'accueil
### 4 - gestion du mode édition sur la page d'accueil lorsqu'un jeton valide est présent (à l'expiration du jeton, le jeton est supprimé)
### 5 développement de la modale
#### 5.1 ajout de l'overlay et de la modale de suppression de travaux existants (rafraichissement de l'affichage des travaux à chaque suppression dans la modale et la gallerie de la page d'accueil)
#### 6.1 ajout de la modale d'ajout de nouveaux travaux, et gestion des champs obligatoires du formulaire avec le bouton de validation, et rafraichissement de la gallerie

## Documentation avec MKDocs et publication dans GitHub 