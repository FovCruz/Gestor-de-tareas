import { createRouter, createWebHistory } from 'vue-router'
import FormCrearTarea from './components/FormCrearTarea.vue'
import Inicio from './components/Inicio.vue'
import ListadoTareas from './components/ListadoTareas.vue'
import Login from './components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/crear-tarea',
    name: 'CrearTarea',
    component: FormCrearTarea
  },
  {
    path: '/tareas',
    name: 'ListadoTareas',
    component: ListadoTareas
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  if (authRequired && !token) {
    return next('/login')
  }
  next()
})

export default router
