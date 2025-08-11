<template>
  <div class="form-container">
    <h2>Enviar datos a SNS</h2>
    <form @submit.prevent="handleSubmit" class="form-sns">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input 
          v-model="nombre" 
          id="nombre" 
          type="text" 
          required 
          :disabled="isLoading"
          placeholder="Ingresa tu nombre"
        />
      </div>
      
      <div class="form-group">
        <label for="apellidos">Apellidos</label>
        <input 
          v-model="apellidos" 
          id="apellidos" 
          type="text" 
          required 
          :disabled="isLoading"
          placeholder="Ingresa tus apellidos"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input 
          v-model="email" 
          id="email" 
          type="email" 
          required 
          :disabled="isLoading"
          placeholder="ejemplo@correo.com"
        />
      </div>
      
      <button type="submit" :disabled="isLoading" class="submit-btn">
        <span v-if="isLoading" class="loading-spinner"></span>
        {{ isLoading ? 'Enviando...' : 'Enviar a SNS' }}
      </button>
      
      <div v-if="mensaje" :class="['mensaje', tipoMensaje]">
        {{ mensaje }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiRequest } from '../config/config.js'

// Referencias reactivas
const nombre = ref('')
const apellidos = ref('')
const email = ref('')
const isLoading = ref(false)
const mensaje = ref('')
const tipoMensaje = ref('') // 'success' o 'error'

// Función para limpiar el formulario
const limpiarFormulario = () => {
  nombre.value = ''
  apellidos.value = ''
  email.value = ''
}

// Función para mostrar mensaje
const mostrarMensaje = (texto, tipo) => {
  mensaje.value = texto
  tipoMensaje.value = tipo
  
  // Limpiar mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.value = ''
    tipoMensaje.value = ''
  }, 5000)
}

// Función para validar email
const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  // Validaciones
  if (!nombre.value.trim() || !apellidos.value.trim() || !email.value.trim()) {
    mostrarMensaje('Por favor, completa todos los campos', 'error')
    return
  }

  if (!validarEmail(email.value)) {
    mostrarMensaje('Por favor, ingresa un correo electrónico válido', 'error')
    return
  }

  isLoading.value = true
  
  try {
    const datos = {
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      email: email.value.trim()
    }

    const response = await apiRequest('/api/sns/enviar-datos', {
      method: 'POST',
      body: JSON.stringify(datos)
    })

    // Verificar si la respuesta es exitosa
    if (response.mensaje) {
      mostrarMensaje(
        `¡Datos enviados exitosamente! Message ID: ${response.messageId}`, 
        'success'
      )
      limpiarFormulario()
    } else {
      throw new Error('Respuesta inesperada del servidor')
    }

  } catch (error) {
    console.error('Error al enviar datos a SNS:', error)
    
    // Manejar diferentes tipos de errores
    if (error.message.includes('400')) {
      mostrarMensaje('Error en los datos enviados. Verifica la información.', 'error')
    } else if (error.message.includes('403')) {
      mostrarMensaje('No tienes permisos para realizar esta acción.', 'error')
    } else if (error.message.includes('404')) {
      mostrarMensaje('El servicio SNS no está disponible.', 'error')
    } else if (error.message.includes('500')) {
      mostrarMensaje('Error interno del servidor. Intenta más tarde.', 'error')
    } else {
      mostrarMensaje('Error al enviar los datos. Verifica tu conexión.', 'error')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.form-sns {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #369870;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.mensaje {
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
}

.mensaje.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensaje.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
