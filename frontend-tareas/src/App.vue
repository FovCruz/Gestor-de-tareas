<script setup>
import { useRoute, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
const route = useRoute()
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <nav v-if="route.path !== '/login'" class="main-nav">
    <router-link to="/">Inicio</router-link>
    <router-link to="/tareas">Listado de Tareas</router-link>
    <router-link to="/crear-tarea">Crear Tarea</router-link>
    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </nav>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.main-nav {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
}
.main-nav a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.main-nav a.router-link-exact-active {
  color: #369870;
  border-bottom: 2px solid #369870;
}
.logout-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #c0392b;
}
</style>
