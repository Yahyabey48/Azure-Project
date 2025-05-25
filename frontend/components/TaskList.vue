<template>
    <div class="task-list">
      <p v-if="tasks.length === 0">Aucune tâche pour le moment</p>
      
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <div class="task-content">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <small>Créée le: {{ new Date(task.created_at).toLocaleDateString() }}</small>
        </div>
        <button @click="$emit('delete-task', task.id)" class="delete-btn">
          Supprimer
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tasks: {
      type: Array,
      required: true
    }
  });
  
  defineEmits(['delete-task']);
  </script>
  
  <style scoped>
  .task-list {
    margin-top: 10px;
  }
  
  .task-item {
    background-color: white;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .task-content {
    flex-grow: 1;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background-color: #d32f2f;
  }
  </style>