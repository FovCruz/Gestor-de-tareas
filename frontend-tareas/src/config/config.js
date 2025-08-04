// Configuración de la aplicación
export const config = {
  // URL base de la API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Otras configuraciones que podrías necesitar
  APP_NAME: import.meta.env.VITE_APP_NAME || 'TG Tareas',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  SERVER_NAME: import.meta.env.VITE_SERVER_NAME || 'TG Tareas Server',
  
  // Configuraciones por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
}

// Función helper para hacer requests a la API
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${config.API_BASE_URL}${endpoint}`
  const defaultOptions = {
    headers: {
      ...config.DEFAULT_HEADERS,
      ...(options.headers || {})
    }
  }
  
  return fetch(url, { ...defaultOptions, ...options, headers: defaultOptions.headers })
}
