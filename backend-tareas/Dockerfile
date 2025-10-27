# Usa una imagen base de Node.js
FROM node:20.12.2-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que se ejecuta la API
EXPOSE 4000

# Define el comando para ejecutar la aplicación
CMD ["node", "src/index.js"]