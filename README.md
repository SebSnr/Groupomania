# Projet-7--Groupomania
Front &amp; back-end of Groupomania web app


Dossier front-end
Installer les librairies => npm start
-- Modifier fichier modules/boostrap/scss/__variables.scss line 345 => $grid-columns: 36 !default;  //change default "12" by "36" columns
Lancer le live serveur => npm start 


Dossier Back-end 
Installer les librairies => npm start
Lancer le live serveur => nodemon server


Toutes les infos de connexion à la base de données SQL : config / db.config.js
Toutes les informations sensibles dans fichier .env


Afin de changer un user en admin dans SQL =>
une fois dans la bdd groupomania, tapez : 

UPDATE users
    SET isAdmin = true
   WHERE id = 3;

UPDATE users set isAdmin = true WHERE id = 3 ;

Changez l'id "3" par l'id de l'utilisateur souhaité.
