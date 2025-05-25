export default defineNuxtConfig({
  // modules: ['@nuxtjs/tailwindcss'], // Commentez ou supprimez cette ligne
  
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://backend-webapp-uek29m.azurewebsites.net'
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'DevOps Demo App',
      meta: [
        { name: 'description', content: 'Application de démonstration pour Azure DevOps' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
});