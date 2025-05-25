<template>
    <div class="task-form">
      <h2>Nouvelle tâche</h2>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="title">Titre</label>
          <input id="title" v-model="task.title" type="text" required>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="task.description"></textarea>
        </div>
        
        <button type="submit" class="btn">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  const task = ref({
    title: '',
    description: ''
  });
  
  const emit = defineEmits(['add-task']);
  
  function submitTask() {
    emit('add-task', { ...task.value });
    // Réinitialiser le formulaire
    task.value = { title: '', description: '' };
  }
  </script>
  
  <style scoped>
  .task-form {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    height: 100px;
  }
  
  .btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  </style>