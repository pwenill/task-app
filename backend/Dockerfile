FROM node:18-alpine
# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup -S appgroup && adduser -S taskappBackend -G appgroup

# Créer un dossier de travail dans le conteneur
WORKDIR /app
# Copie les fichiers package.json et package-lock.json
COPY package*.json ./
# Installe les dépendances
RUN npm ci
# Copie le reste du code dans le conteneur
COPY . .
# Change le propriétaire des fichiers
RUN chown -R taskappBackend:appgroup /app
# Utilise l'utilisateur non-root
USER taskappBackend
# Le conteneur écoutera sur le port 4000
EXPOSE 4000
# Démarre le serveur
CMD ["npm", "run", "dev"]