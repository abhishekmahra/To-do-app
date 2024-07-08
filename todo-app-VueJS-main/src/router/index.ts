import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../components/Landing/LandingPage.vue'
import LoginPage from '../components/login/LoginApp.vue'
import RegistrationPage from '../components/Registration/RegistrationApp.vue'
import TodoPage from '../components/TodoApp/TodoApp.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/Login', component: LoginPage },
  { path: '/Registration', component: RegistrationPage },
  { path: '/Todo', component: TodoPage }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
