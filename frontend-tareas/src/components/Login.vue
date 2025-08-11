<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Acceso al Sistema</h2>
      <div class="server-info">
        <p class="server-name">Servidor: {{ serverInfo.name }}</p>
        <p class="server-ip">IP: {{ serverInfo.ip }}</p>
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Clave</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Ingresar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiRequest, config } from '../config/config.js'

const email = ref('')
const password = ref('')
const error = ref('')
const token = ref('')
const router = useRouter()

// Información del servidor
const serverInfo = ref({
  name: config.SERVER_NAME,
  ip: 'Obteniendo...'
})

// Obtener información del servidor
const getServerInfo = async () => {
  try {
    // Obtener la IP del servidor desde la URL de la API
    const apiUrl = new URL(config.API_BASE_URL)
    const hostname = apiUrl.hostname
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      serverInfo.value.ip = '127.0.0.1 (Local)'
    } else {
      serverInfo.value.ip = hostname
    }
    
    // Opcional: obtener más información del servidor si tienes un endpoint
    // const response = await apiRequest('/api/server-info')
    // const data = await response.json()
    // serverInfo.value.name = data.serverName || config.SERVER_NAME
  } catch (error) {
    console.log('No se pudo obtener información del servidor:', error)
    serverInfo.value.ip = 'No disponible'
  }
}

const handleLogin = async () => {
  error.value = ''
  try {
    const data = await apiRequest('/api/usuarios/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    
    // La función apiRequest ya devuelve el JSON parseado
    localStorage.setItem('token', data.token)
    token.value = data.token
    // Redirigir al inicio
    router.push('/')
  } catch (e) {
    // El error ya viene formateado desde apiRequest
    error.value = e.message || 'Error de acceso'
    console.error('Error en login:', e)
  }
}

// Ejecutar al montar el componente
onMounted(() => {
  getServerInfo()
})
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b983 0%, #2980b9 100%);
  overflow: auto;
}
.login-form {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.login-form h2 {
  margin: 0 0 1rem 0;
  color: #42b983;
  text-align: center;
}
.server-info {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.server-info p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #6c757d;
}
.server-name {
  font-weight: 600;
  color: #495057 !important;
}
.server-ip {
  font-family: 'Courier New', monospace;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0.25rem;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
button[type="submit"] {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="submit"]:hover {
  background: #2980b9;
}
.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
