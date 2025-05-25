const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.delete('/:id', TaskController.deleteTask);


module.exports = router;