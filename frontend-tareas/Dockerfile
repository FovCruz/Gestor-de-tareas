# ----- Build stage -----
FROM node:20-alpine AS build
WORKDIR /app

# Argumentos de construcción para variables VITE_
ARG VITE_API_BASE_URL
ARG VITE_SERVER_NAME

# Establecer las variables de entorno para el build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_SERVER_NAME=${VITE_SERVER_NAME}

# Copia manifiestos primero para aprovechar caché
COPY package*.json ./
RUN npm ci

# Copia el resto y construye
COPY . .
RUN npm run build

# ----- Runtime stage -----
FROM nginx:1.27-alpine
# Copia los archivos generados por Vite
COPY --from=build /app/dist /usr/share/nginx/html
# Config Nginx para SPA (history mode)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1
