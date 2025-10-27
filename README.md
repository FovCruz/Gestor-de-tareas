# TG Tareas - Aplicación de Gestión de Tareas

Una aplicación full-stack para la gestión de tareas construida con Vue.js 3 en el frontend y Node.js/Express con MongoDB en el backend.

## Características

- Crear, editar y eliminar tareas
- Sistema de autenticación de usuarios
- Autenticación JWT
- Interfaz responsive con Vue.js 3
- Base de datos MongoDB
- API RESTful

## Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Manejo de políticas de origen cruzado

### Frontend
- **Vue.js 3** - Framework de JavaScript
- **Vue Router** - Enrutamiento
- **Vite** - Herramienta de construcción

## Estructura del Proyecto

```
tg-tareas/
├── backend-tareas/          # API Backend
│   ├── config/              # Configuraciones
│   ├── controllers/         # Controladores
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de la API
│   └── src/                # Punto de entrada
└── frontend-tareas/        # Aplicación Vue.js
    ├── src/                # Código fuente
    ├── components/         # Componentes Vue
    └── public/             # Archivos estáticos
```

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Configurar el Backend

```bash
# Navegar al directorio del backend
cd backend-tareas

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
touch .env
```

Configurar el archivo `.env` con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/tg-tareas
# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tg-tareas

# JWT Secret
JWT_SECRET=tu_jwt_secret_muy_seguro

# Entorno
NODE_ENV=development
```

### Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd ../frontend-tareas

# Instalar dependencias
npm install
```

## Ejecutar la Aplicación

### Modo Desarrollo

#### Iniciar el Backend
```bash
cd backend-tareas
npm run dev
# O si no tienes script dev configurado:
node src/index.js
```
El servidor backend estará disponible en: `http://localhost:3000`

#### Iniciar el Frontend
```bash
cd frontend-tareas
npm run dev
```
La aplicación frontend estará disponible en: `http://localhost:5173`

### Scripts Disponibles

#### Backend
```bash
npm start          # Ejecutar en producción
npm run dev        # Ejecutar en desarrollo (si está configurado)
```

#### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Vista previa de la construcción
```

## Despliegue en Producción

### Opción 1: Despliegue Manual

#### 1. Preparar el Frontend
```bash
cd frontend-tareas
npm run build
```

#### 2. Configurar variables de entorno de producción
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=tu_mongodb_uri_de_produccion
JWT_SECRET=tu_jwt_secret_super_seguro
```

#### 3. Ejecutar el backend
```bash
cd backend-tareas
npm start
```

### Opción 2: Despliegue con Docker

Crear `Dockerfile` en la raíz del proyecto:

```dockerfile
# Dockerfile para producción
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos del backend
COPY backend-tareas/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production

# Copiar archivos del frontend y construir
WORKDIR /app
COPY frontend-tareas/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
COPY frontend-tareas/ .
RUN npm run build

# Volver al backend y copiar archivos
WORKDIR /app/backend
COPY backend-tareas/ .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/index.js"]
```

```bash
# Construir imagen
docker build -t tg-tareas .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env tg-tareas
```

### Opción 3: Despliegue en Heroku

```bash
# Instalar Heroku CLI
# Configurar variables de entorno en Heroku
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=tu_mongodb_uri
heroku config:set JWT_SECRET=tu_jwt_secret

# Desplegar
git push heroku main
```

### Opción 4: Despliegue en Vercel/Netlify

Para el frontend:
```bash
# Frontend en Vercel/Netlify
cd frontend-tareas
npm run build
# Subir la carpeta dist/
```

Para el backend, usar servicios como Railway, Render, o DigitalOcean.

## Configuración de Base de Datos

### MongoDB Local
```bash
# Instalar MongoDB
brew install mongodb/brew/mongodb-community

# Iniciar MongoDB
brew services start mongodb/brew/mongodb-community

# Conectar (la aplicación creará automáticamente la base de datos)
```

### MongoDB Atlas (Recomendado para producción)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster
3. Obtener la string de conexión
4. Configurar en las variables de entorno

## API Endpoints

### Usuarios
- `POST /api/usuarios/registro` - Registrar usuario
- `POST /api/usuarios/login` - Iniciar sesión

### Tareas
- `GET /api/tareas` - Obtener todas las tareas del usuario
- `POST /api/tareas` - Crear nueva tarea
- `PUT /api/tareas/:id` - Actualizar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea