// --- IMPORTS ---
// Import des modules externes
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv'); // Suppression du doublon
const { userRouter } = require('./routes/users.route');

// --- CONFIGURATION DES VARIABLES D'ENVIRONNEMENT ---
// Détermination du fichier .env à charger en fonction de NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;

// Chargement du fichier d'environnement (remonte d'un niveau depuis le dossier courant)
dotenv.config({ 
  path: path.join(__dirname, '..', envFile) 
});

// --- CONFIGURATION DE L'APPLICATION EXPRESS ---
var app = express();

// --- MIDDLEWARES ---
// Logger HTTP pour le développement
app.use(logger('dev'));

// Parseur pour les requêtes JSON
app.use(express.json());

// Parseur pour les données de formulaires URL-encoded
app.use(express.urlencoded({ extended: false }));

// Parseur pour les cookies
app.use(cookieParser());

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',userRouter)

// --- VERIFICATION DE LA CONFIGURATION ---
// Affichage des variables d'environnement chargées
console.log("✅ Running in:", process.env.NODE_ENV);
console.log("✅ Port:", process.env.PORT);

// --- EXPORT ---
// Export de l'application Express pour utilisation dans bin/www
module.exports = app;