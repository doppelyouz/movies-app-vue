import { createRouter, createWebHashHistory } from 'vue-router'

import Netflix from '../views/Netflix'
import Login from '../views/Login'
import Registration from '../views/Registration'
import Profile from '../views//Profile'
import Settings from '../views//Settings'

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
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
