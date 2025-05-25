import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  console.log("Configuration API:", config.public.apiBaseUrl);
  
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 10000
  });
  
  // Intercepteur pour déboguer les requêtes
  api.interceptors.request.use(request => {
    console.log('Request:', request.method.toUpperCase(), request.baseURL + request.url);
    return request;
  });
  
  // Intercepteur pour d��boguer les réponses
  api.interceptors.response.use(
    response => {
      console.log('Response:', response.status, response.config.url);
      return response;
    },
    error => {
      console.error('API Error:', error.response?.status, error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  
  return {
    provide: {
      api
    }
  };
});