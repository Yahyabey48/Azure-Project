require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/taskRoutes');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // En production, spécifiez l'URL exacte du frontend
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour le logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API backend fonctionnelle !' });
});

// Route pour la vérification de l'état
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

