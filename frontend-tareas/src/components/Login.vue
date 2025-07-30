<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Acceso al Sistema</h2>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const token = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    const response = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Error de acceso')
    }
    const data = await response.json()
    localStorage.setItem('token', data.token)
    token.value = data.token
    // Redirigir al inicio
    router.push('/')
  } catch (e) {
    error.value = e.message
  }
}
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
