# API REST de Tareas

Esta API permite gestionar tareas usando Node.js, Express y MongoDB (Mongoose).

## Estructura de carpetas
- `controllers/`: Lógica de negocio y controladores
- `models/`: Definición de esquemas y modelos de Mongoose
- `routes/`: Definición de rutas de la API
- `config/`: Configuración de la base de datos

## Instalación y uso

1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Asegúrate de tener MongoDB corriendo localmente con la base de datos `dbtareas` y usuario `admin`/`admin`.
4. Inicia el servidor:
   ```sh
   node src/index.js
   ```

## Endpoints principales
- `POST /api/tareas` - Crear tarea
- `GET /api/tareas` - Listar tareas
- `GET /api/tareas/:id` - Detalle de tarea
- `PUT /api/tareas/:id` - Editar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea
