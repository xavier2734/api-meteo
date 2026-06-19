# MétéoAPI

API REST développée avec Node.js et Express permettant de consulter, créer, modifier et supprimer des relevés météorologiques stockés dans un fichier CSV.

Le projet est structuré en couches (Repository → Service → Controller → Routes) afin de séparer l'accès aux données, la logique métier et la gestion des requêtes HTTP.

---

## Fonctionnalités

### Relevés météo

* Liste de tous les relevés
* Consultation d'un relevé par identifiant
* Création d'un relevé
* Modification d'un relevé
* Suppression d'un relevé

### Villes

* Liste des villes distinctes présentes dans les relevés
* Nombre de relevés par ville
* Température minimale moyenne par ville
* Température maximale moyenne par ville

### Statistiques

* Température minimale globale
* Température maximale globale
* Température moyenne globale
* Humidité moyenne globale

### Documentation

* Documentation Swagger/OpenAPI
* Documentation JSDoc

---

## Architecture du projet

```text
src/
├── controllers/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
└── config.js
```

### Repository

Responsable de l'accès aux données :

* lecture du fichier CSV
* écriture du fichier CSV
* recherche des relevés

### Service

Responsable de la logique métier :

* validation des données
* calculs statistiques
* agrégations par ville

### Controller

Responsable des échanges HTTP :

* récupération des paramètres
* gestion des codes de retour HTTP
* sérialisation JSON

### Routes

Définition des endpoints de l'API.

---

## Installation

### Cloner le projet

```bash
git clone <url-du-repository>
cd meteo-api
```

### Ajouter les variables d'environnement

Dans un .env à la racine, ajouter les variables suivantes:
```bash
API_URL=http://localhost:3000
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
CSVPATH=data/meteo.csv
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=azerty
DB_NAME=meteo_db
```

### Installer les dépendances

```bash
npm install
```

### Initialiser la base de donner

Se connecter à mysql et créer la base de donnée:
```bash
CREATE DATABASE IF NOT EXISTS meteo_db;
```

Rentrer dans la base de donnée:
```bash
USE meteo_db;
```

Créer la table releves:
```bash
CREATE TABLE releves (
  id INT(11)
  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ville VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  temperatureMin DECIMAL(4) NOT NULL,
  temperatureMax DECIMAL(4) NOT NULL,
  description VARCHAR(100) NOT NULL,
  humidite DECIMAL(4) NOT NULL
);
```

### Lancer le script d'import csv -> database

```bash
node data/db-import.js
```

### Lancer le serveur

```bash
npm run dev
```

Le serveur démarre par défaut sur :

```text
http://localhost:3000
```

### Lancer le CLI

```bash
cd meteo-CLI && npm run dev
```

---

## Endpoints API

### Healthcheck

| Méthode | Route        |
| ------- | ------------ |
| GET     | /healthcheck |

---

### Relevés

| Méthode | Route        |
| ------- | ------------ |
| GET     | /releves     |
| GET     | /releves/:id |
| POST    | /releves     |
| PUT     | /releves/:id |
| DELETE  | /releves/:id |

#### Exemple de création

```json
{
  "ville": "Arles",
  "date": "2024-01-15",
  "temperatureMin": 20,
  "temperatureMax": 30,
  "description": "Temps chaud",
  "humidite": 70
}
```

---

### Villes

| Méthode | Route   |
| ------- | ------- |
| GET     | /villes |

Exemple de réponse :

```json
[
  {
    "ville": "Arles",
    "nombreReleves": 14,
    "temperatureMinMoyenne": 8.5,
    "temperatureMaxMoyenne": 16.3
  }
]
```

---

### Statistiques

| Méthode | Route  |
| ------- | ------ |
| GET     | /stats |

Exemple de réponse :

```json
{
  "temperatureMinGlobale": -4,
  "temperatureMaxGlobale": 33,
  "temperatureMoyenne": 15.8,
  "humiditeMoyenne": 72.4
}
```

---

## Documentation Swagger

La documentation interactive est accessible à l'adresse :

```text
http://localhost:3000/api-docs
```

Swagger est généré automatiquement à partir des annotations OpenAPI présentes dans les fichiers de routes.

---

## Documentation JSDoc

Génération de la documentation :

```bash
npx jsdoc src -r -d docs
```

La documentation sera générée dans le dossier :

```text
docs/
```

---

## Technologies utilisées

* Node.js
* Express
* Swagger UI Express
* Swagger JSDoc
* JSDoc
* CSV comme stockage de données

---

## Auteur

Projet réalisé dans le cadre d'un exercice de formation Node.js / Express.
