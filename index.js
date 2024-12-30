const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const sequelize = require('./database');
const routes = require('./routes/router');
const port = process.env.PORT || 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(
  cors({
    origin: 'http://localhost:3000', // Autorise uniquement cette origine (le frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorise uniquement ces méthodes
    allowedHeaders: ['Content-Type', 'Authorization'], // Autorise ces en-têtes
  })
);

// Middleware Helmet avec configuration CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000"], // Autorise les connexions réseau vers localhost
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
);

// Routes de l'application
app.use('/api', routes);

// Synchronisation avec Sequelize
sequelize
  .sync({ option: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Unable to create table:', error);
  });

// Démarrage du serveur
app.listen(port, () => console.log(`Ecommerce backend is loading on port ${port}`));
