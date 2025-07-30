<template>
  <section class="listado-tareas">
    <h2>Listado de Tareas</h2>
    <div v-if="loading" class="loading">Cargando tareas...</div>
    <div v-else>
      <div v-if="tareas.length === 0" class="no-tareas">No hay tareas registradas.</div>
      <ul class="tareas-list">
        <li v-for="tarea in tareas" :key="tarea._id" class="tarea-item">
          <div class="tarea-info">
            <span class="titulo">{{ tarea.titulo }}</span>
            <span class="detalle">{{ tarea.detalle.slice(0, 40) }}{{ tarea.detalle.length > 40 ? '...' : '' }}</span>
            <span class="fecha">{{ formatFecha(tarea.fechaCreacion) }}</span>
            <span class="estado" :class="tarea.estado">{{ tarea.estado }}</span>
          </div>
          <div class="acciones">
            <button @click="abrirModalDetalle(tarea)" title="Ver Detalle">🔍</button>
            <button @click="abrirModalEditar(tarea)" title="Editar">✏️</button>
            <button @click="confirmarEliminar(tarea)" title="Eliminar">🗑️</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal Detalle -->
    <div v-if="modalDetalle" class="modal-overlay" @click.self="cerrarModalDetalle">
      <div class="modal">
        <h3>Detalle de la Tarea</h3>
        <p><strong>Título:</strong> {{ tareaSeleccionada.titulo }}</p>
        <p><strong>Detalle:</strong> {{ tareaSeleccionada.detalle }}</p>
        <p><strong>Fecha de Creación:</strong> {{ formatFecha(tareaSeleccionada.fechaCreacion) }}</p>
        <p><strong>Estado:</strong> {{ tareaSeleccionada.estado }}</p>
        <button @click="cerrarModalDetalle">Cerrar</button>
      </div>
    </div>

    <!-- Modal Editar -->
    <div v-if="modalEditar" class="modal-overlay" @click.self="cerrarModalEditar">
      <div class="modal">
        <h3>Editar Tarea</h3>
        <form @submit.prevent="guardarEdicion">
          <div class="form-group">
            <label for="edit-titulo">Título</label>
            <input v-model="tareaEditando.titulo" id="edit-titulo" type="text" required />
          </div>
          <div class="form-group">
            <label for="edit-detalle">Detalle</label>
            <textarea v-model="tareaEditando.detalle" id="edit-detalle" required></textarea>
          </div>
          <div class="form-group">
            <label for="edit-estado">Estado</label>
            <select v-model="tareaEditando.estado" id="edit-estado" required>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" @click="cerrarModalEditar">Cancelar</button>
        </form>
      </div>
    </div>

    <!-- Modal Confirmar Eliminación -->
    <div v-if="modalEliminar" class="modal-overlay" @click.self="cerrarModalEliminar">
      <div class="modal">
        <h3>¿Eliminar tarea?</h3>
        <p>¿Estás seguro de que deseas eliminar la tarea "{{ tareaSeleccionada.titulo }}"?</p>
        <button @click="eliminarTarea">Sí, eliminar</button>
        <button @click="cerrarModalEliminar">Cancelar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tareas = ref([])
const loading = ref(true)
const modalDetalle = ref(false)
const modalEditar = ref(false)
const modalEliminar = ref(false)
const tareaSeleccionada = ref({})
const tareaEditando = ref({})

const fetchTareas = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/tareas', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    tareas.value = await res.json()
  } catch (e) {
    tareas.value = []
  } finally {
    loading.value = false
  }
}

const formatFecha = fecha => {
  return new Date(fecha).toLocaleString()
}

const abrirModalDetalle = tarea => {
  tareaSeleccionada.value = { ...tarea }
  modalDetalle.value = true
}
const cerrarModalDetalle = () => {
  modalDetalle.value = false
}

const abrirModalEditar = tarea => {
  tareaEditando.value = { ...tarea }
  modalEditar.value = true
}
const cerrarModalEditar = () => {
  modalEditar.value = false
}
const guardarEdicion = async () => {
  try {
    await fetch(`http://localhost:3000/api/tareas/${tareaEditando.value._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(tareaEditando.value)
    })
    await fetchTareas()
    cerrarModalEditar()
  } catch (e) {}
}

const confirmarEliminar = tarea => {
  tareaSeleccionada.value = { ...tarea }
  modalEliminar.value = true
}
const cerrarModalEliminar = () => {
  modalEliminar.value = false
}
const eliminarTarea = async () => {
  try {
    await fetch(`http://localhost:3000/api/tareas/${tareaSeleccionada.value._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    await fetchTareas()
    cerrarModalEliminar()
  } catch (e) {}
}

onMounted(fetchTareas)
</script>

<style scoped>
.listado-tareas {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 2rem;
}
.tareas-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tarea-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.tarea-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}
.titulo {
  font-weight: bold;
  font-size: 1.1rem;
}
.detalle {
  color: #666;
  font-size: 0.95rem;
}
.fecha {
  color: #aaa;
  font-size: 0.9rem;
}
.estado {
  font-size: 0.95rem;
  font-weight: 500;
  margin-top: 0.2rem;
}
.estado.pendiente {
  color: #e67e22;
}
/*.estado['en progreso'] {
  color: #2980b9;
}*/
.estado.completada {
  color: #27ae60;
}
.acciones button {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.acciones button:hover {
  color: #42b983;
}
.loading, .no-tareas {
  text-align: center;
  color: #888;
  margin: 2rem 0;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
}
.modal h3 {
  margin-top: 0;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
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
button[type="submit"], .modal button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: background 0.2s;
}
button[type="submit"]:hover, .modal button:hover {
  background: #369870;
}
</style>
