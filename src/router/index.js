import { createRouter, createWebHashHistory } from 'vue-router'

import Netflix from '../views/Netflix'
import Login from '../views/Login'
import Registration from '../views/Registration'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Netflix
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
