# Frontend Tareas - Vue 3 + Vite

Frontend de la aplicación de gestión de tareas desarrollado con Vue 3, Vue Router y Vite.

## Características

- **Vue 3** con Composition API
- **Vue Router** para navegación
- **Vite** como bundler y servidor de desarrollo
- **Componentes reactivos** con script setup
- **Integración con API REST** del backend
- **Formulario SNS** para envío de datos a Amazon SNS

## Estructura del proyecto

```
src/
├── components/          # Componentes Vue
│   ├── FormCrearTarea.vue    # Formulario para crear tareas
│   ├── FormEnviarSNS.vue     # Formulario para enviar datos a SNS
│   ├── ListadoTareas.vue     # Lista de tareas
│   ├── Login.vue             # Componente de login
│   └── Inicio.vue            # Página de inicio
├── config/
│   └── config.js            # Configuración de la API
├── App.vue                  # Componente principal
├── main.js                  # Punto de entrada
└── router.js                # Configuración de rutas
```

## Instalación y uso

1. Instala las dependencias:
   ```sh
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

3. Construir para producción:
   ```sh
   npm run build
   ```

## Rutas disponibles

- `/` - Página de inicio
- `/login` - Página de login
- `/tareas` - Listado de tareas
- `/crear-tarea` - Formulario para crear nueva tarea
- `/enviar-sns` - Formulario para enviar datos a SNS

## Funcionalidad SNS

El componente `FormEnviarSNS.vue` permite enviar datos de usuario (nombre, apellidos, email) al backend que los reenvía a Amazon SNS.

### Características del formulario SNS:
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Estado de carga durante envío
- ✅ Manejo de errores con mensajes descriptivos
- ✅ Limpieza automática del formulario tras éxito
- ✅ Diseño responsive

## Configuración

El frontend se conecta al backend mediante la configuración en `src/config/config.js`. 

Variables de entorno disponibles:
- `VITE_API_BASE_URL` - URL base de la API (default: http://localhost:3000)
- `VITE_APP_NAME` - Nombre de la aplicación
- `VITE_APP_VERSION` - Versión de la aplicación

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
