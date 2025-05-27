const db = require('../config/db');

const TaskModel = {
  async getAllTasks() {
    const result = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  },

  async getTaskById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  },

  async createTask(title, description) {
    const result = await db.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return result.rows[0];
  },

  async deleteTask(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = TaskModel;