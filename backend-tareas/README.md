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

### Tareas
- `POST /api/tareas` - Crear tarea
- `GET /api/tareas` - Listar tareas
- `GET /api/tareas/:id` - Detalle de tarea
- `PUT /api/tareas/:id` - Editar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea

### Usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios/login` - Login de usuario

### SNS (Amazon Simple Notification Service)
- `POST /api/sns/enviar-datos` - Enviar datos de usuario a SNS
- `GET /api/sns/verificar-config` - Verificar configuración de SNS

#### Endpoint SNS - Enviar datos
**POST** `/api/sns/enviar-datos`

Envía información de usuario a un tópico de Amazon SNS.

**Cuerpo de la petición:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "email": "juan.perez@example.com"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Datos enviados exitosamente a SNS",
  "messageId": "12345678-1234-1234-1234-123456789012",
  "timestamp": "2025-08-10T12:00:00.000Z"
}
```

**Configuración requerida:**
Agregar estas variables al archivo `.env`:
```env
AWS_ACCESS_KEY_ID=tu_access_key_id
AWS_SECRET_ACCESS_KEY=tu_secret_access_key
AWS_REGION=us-east-1
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:tu-topic-name
```
