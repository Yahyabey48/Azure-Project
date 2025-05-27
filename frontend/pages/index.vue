<template>
    <div class="container">
      <h1>Tableau de bord</h1>
      
      <TaskForm @add-task="addTask" />
      
      <div class="tasks">
        <h2>Tâches ({{ tasks.length }})</h2>
        <TaskList :tasks="tasks" @delete-task="deleteTask" />
      </div>
    </div>
  </template>
  
  <script setup>
  const tasks = ref([]);
  const { $api } = useNuxtApp();
  
  // Charger les tâches au démarrage
  onMounted(async () => {
    await fetchTasks();
  });
  
  // Récupérer les tâches
  async function fetchTasks() {
    try {
      console.log("URL de l'API:", $api.defaults.baseURL + '/tasks');
      const response = await $api.get('/tasks'); // Requête GET
      console.log("Données reçues:", response.data);
      tasks.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  }
  
  // Ajouter une tâche
  async function addTask(task) {
    try {
      await $api.post('/tasks', task); // Requête POST
      await fetchTasks();
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une tâche:', error);
    }
  }
  
  // Supprimer une tâche
  async function deleteTask(id) {
    try {
      await $api.delete(`/tasks/${id}`);  // Ajoutez /api/ ici
      await fetchTasks();
    } catch (error) {
      console.error('Erreur lors de la suppression d\'une tâche:', error);
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .tasks {
    margin-top: 30px;
  }
  </style>