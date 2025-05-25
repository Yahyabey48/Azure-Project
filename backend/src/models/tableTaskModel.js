const tableClient = require('../config/tableStorage');

// Utilitaire pour convertir un élément de Table Storage en tâche
function tableEntityToTask(entity) {
  return {
    id: entity.rowKey,
    title: entity.title,
    description: entity.description || '',
    created_at: new Date(entity.timestamp).toISOString(),
    updated_at: new Date(entity.timestamp).toISOString()
  };
}

const TaskModel = {
  // Récupérer toutes les tâches
  async getAllTasks() {
    console.log('TableTaskModel: getAllTasks appelé');
    const tasks = [];
    try {
      const entities = tableClient.listEntities();
      for await (const entity of entities) {
        tasks.push(tableEntityToTask(entity));
      }
      return tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
      console.error('Erreur dans getAllTasks:', error);
      return [];
    }
  },

  // Récupérer une tâche par son ID
  async getTaskById(id) {
    console.log('TableTaskModel: getTaskById appelé avec id:', id);
    try {
      const entity = await tableClient.getEntity('tasks', id);
      return tableEntityToTask(entity);
    } catch (error) {
      console.error('Erreur dans getTaskById:', error);
      if (error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  },

  // Créer une nouvelle tâche
  async createTask(title, description) {
    console.log('TableTaskModel: createTask appelé');
    const taskId = Date.now().toString();
    const task = {
      partitionKey: 'tasks',
      rowKey: taskId,
      title,
      description: description || '',
      timestamp: new Date()
    };
    
    await tableClient.createEntity(task);
    return tableEntityToTask(task);
  },

  // Supprimer une tâche
  async deleteTask(id) {
    console.log('TableTaskModel: deleteTask appelé avec id:', id);
    try {
      const task = await this.getTaskById(id);
      if (!task) {
        return null;
      }
      
      await tableClient.deleteEntity('tasks', id);
      return task;
    } catch (error) {
      console.error('Erreur dans deleteTask:', error);
      if (error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }
};

module.exports = TaskModel;
