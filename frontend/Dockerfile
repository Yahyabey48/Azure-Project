FROM node:18-alpine
WORKDIR /app

# Copier package.json en premier (meilleur cache Docker)
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Variables d'environnement AVANT le build
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN npm run build

EXPOSE 3000

# Commande de démarrage
CMD ["node", ".output/server/index.mjs"]