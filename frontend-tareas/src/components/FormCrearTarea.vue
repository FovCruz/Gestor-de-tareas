<template>
  <form @submit.prevent="handleSubmit" class="form-tarea">
    <div class="form-group">
      <label for="titulo">Título</label>
      <input v-model="titulo" id="titulo" type="text" required />
    </div>
    <div class="form-group">
      <label for="detalle">Detalle</label>
      <textarea v-model="detalle" id="detalle" required></textarea>
    </div>
    <div class="form-group">
      <label for="estado">Estado</label>
      <select v-model="estado" id="estado" required>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
    </div>
    <button type="submit">Crear Tarea</button>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { apiRequest } from '../config/config.js'

const titulo = ref('')
const detalle = ref('')
const estado = ref('pendiente')
const mensaje = ref('')

const handleSubmit = async () => {
  mensaje.value = ''
  
  // Verificar si hay token
  const token = localStorage.getItem('token')
  if (!token) {
    mensaje.value = 'No hay sesión activa. Por favor, inicia sesión.'
    return
  }
  
  try {
    const response = await apiRequest('/api/tareas', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        titulo: titulo.value,
        detalle: detalle.value,
        estado: estado.value
      })
    })
    
    if (!response.ok) {
      // Intentar obtener el mensaje de error del servidor
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`
      throw new Error(errorMessage)
    }
    
    titulo.value = ''
    detalle.value = ''
    estado.value = 'pendiente'
    mensaje.value = 'Tarea creada exitosamente.'
  } catch (error) {
    console.error('Error al crear tarea:', error)
    mensaje.value = error.message
  }
}
</script>

<style scoped>
.form-tarea {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.form-group input,
.form-group textarea,
.form-group select {
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
  background: #369870;
}
.mensaje {
  margin-top: 1rem;
  color: #42b983;
  font-weight: 500;
}
</style>
