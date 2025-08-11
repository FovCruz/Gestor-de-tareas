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
  const token = localStorage.getItem('token')
  
  const defaultOptions = {
    headers: {
      ...config.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    }
  }
  
  try {
    const response = await fetch(url, { ...defaultOptions, ...options, headers: defaultOptions.headers })
    
    // Si la respuesta no es exitosa, lanzar error con el status
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.mensaje || errorData.message || errorMessage
      } catch (jsonError) {
        // Si no se puede parsear JSON, usar el mensaje por defecto
        console.warn('No se pudo parsear JSON del error:', jsonError)
      }
      
      throw new Error(errorMessage)
    }
    
    // Intentar parsear JSON, si falla devolver texto
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    // Si es un error de red o fetch, mantener el mensaje original
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Error de conexión. Verifica que el servidor esté funcionando.')
    }
    
    console.error('Error en apiRequest:', error)
    throw error
  }
}
