const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Import conditionnel selon l'environnement
let pg, TaskModel;

if (process.env.STORAGE_ACCOUNT_NAME) {
  // Environment Azure: utiliser Table Storage
  TaskModel = require('../models/tableTaskModel');
} else {
  // Environment local: utiliser PostgreSQL
  pg = require('../config/db');
  TaskModel = require('../models/taskModel');
}

// Test de connexion avec retry
const testConnection = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log('Base de données connectée avec succès');
      return;
    } catch (err) {
      console.error(`Tentative ${i+1}/${retries}: Erreur de connexion à la base de données`, err);
      if (i < retries - 1) {
        console.log(`Nouvelle tentative dans ${delay/1000} secondes...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error(`Échec de connexion à la base de données après ${retries} tentatives`);
};

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params)
};