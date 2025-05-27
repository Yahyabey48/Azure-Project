const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Import conditionnel selon l'environnement
let TaskModel;

if (process.env.STORAGE_ACCOUNT_NAME) {
  // Environnement Azure : utiliser Table Storage
  try {
    TaskModel = require('../models/tableTaskModel');
  } catch (error) {
    console.error('Erreur lors du chargement de tableTaskModel:', error);
    process.exit(1); // Arrêter l'application si le modèle est introuvable
  }
} else {
  // Environnement local : utiliser PostgreSQL
  try {
    TaskModel = require('../models/taskModel');
  } catch (error) {
    console.error('Erreur lors du chargement de taskModel:', error);
    process.exit(1); // Arrêter l'application si le modèle est introuvable
  }
}

// Test de connexion avec retry
const testConnection = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log('Base de données connectée avec succès');
      return;
    } catch (err) {
      console.error(`Tentative ${i + 1}/${retries}: Erreur de connexion à la base de données`, err);
      if (i < retries - 1) {
        console.log(`Nouvelle tentative dans ${delay / 1000} secondes...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error(`Échec de connexion à la base de données après ${retries} tentatives`);
  process.exit(1); // Arrêter l'application si la connexion échoue
};

// Test de connexion avec retry uniquement si nous n'utilisons pas Table Storage
if (!process.env.STORAGE_ACCOUNT_NAME) {
  testConnection();
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  TaskModel,
};