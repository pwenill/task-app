FROM node:18-alpine
# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup -S appgroup && adduser -S taskappFrontend -G appgroup
# Créer un dossier de travail dans le conteneur
WORKDIR /app
# Copie les fichiers package.json et package-lock.json
COPY package*.json ./
# Installe les dépendances
RUN npm ci
# Copie le reste du code dans le conteneur
COPY . .
# Change le propriétaire des fichiers
RUN chown -R taskappFrontend:appgroup /app
# Utilise l'utilisateur non-root
USER taskappFrontend
# Le conteneur écoutera sur le port 3000
EXPOSE 3000
# Démarre l'application Next.js en mode développement
CMD ["npm", "run", "dev"]