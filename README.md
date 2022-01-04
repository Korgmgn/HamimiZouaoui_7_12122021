# Bienvenue sur le MVP du réseau social interne de Groupomania !



Pour initialiser le projet, veuillez suivre les étapes dans l'ordre:

- Clonez le repository.

- Pour connecter votre base de données, vous trouverez le fichier config.json sous './backend/config/config.json'.

- Une fois config.json ouvert, dans la section "development", entrez les identifiants de votre base de données en remplaçant les champs concernés (username, password et database).

- Pour peupler la base de données:
  - Importez le dump fourni dans les livrables, avec la commande ```shell $ mysql -u root -p groupomania_db < groupomania_db.sql```
  - Ou alors, peuplez à votre guise la base de données avec des utilisateurs, des posts, des images et des commentaires.

- Si vous utilisez le dump fourni, vous pouvez extraire les fichiers images présents dans les livrables, dans le dossier './backend/images' (sinon ils ne s'afficheront pas).

- Une fois votre base de données importée, ouvrez le terminal et placez vous dans le dossier 'backend'.

- Entrez la commande ```shell $ npm install``` pour installer les dépendances, puis ```shell $ nodemon server``` pour lancer le serveur

- Ensuite, avec le terminal placez vous dans le dossier frontend.

- Entrez la commande ```shell $ npm install``` pour installer les dépendances, puis ```shell $ npm run serve``` pour lancer l'application
