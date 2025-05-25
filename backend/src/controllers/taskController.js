const pg = require('../config/db');

// Choisir le modèle en fonction de l'environnement
const TaskModel = process.env.STORAGE_ACCOUNT_NAME ? 
  require('../models/tableTaskModel') :  // Azure (Table Storage)
  require('../models/taskModel');        // Développement local (PostgreSQL)


const TaskController = {
  // Récupérer toutes les tâches
  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Récupérer une tâche par ID
  async getTaskById(req, res) {
    try {
      const task = await TaskModel.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      res.json(task);
    } catch (error) {
      console.error('Erreur lors de la récupération de la tâche:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Créer une nouvelle tâche
  async createTask(req, res) {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Le titre est requis' });
    }
    
    try {
      const newTask = await TaskModel.createTask(title, description || '');
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Supprimer une tâche
  async deleteTask(req, res) {
    try {
      const task = await TaskModel.deleteTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
      res.json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

module.exports = TaskController;
