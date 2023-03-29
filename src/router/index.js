import { createRouter, createWebHashHistory } from 'vue-router'

import Netflix from '../views/Netflix'
import Login from '../views/Login'
import Registration from '../views/Registration'
import Profile from '../views/Profile'
import Settings from '../views/Settings'
import User from '../views/User'
import OneMovie from '../views/OneMovie'
import AddMovie from '../views/AddMovie'
import TopUpBalance from '../views/TopUpBalance'

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
    path: '/user/:id',
    name: 'user',
    component: User
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/movies/:id',
    name: 'movie',
    component: OneMovie
  },
  {
    path: '/add',
    name: 'add',
    component: AddMovie
  },
  {
    path: '/payment',
    name: 'payment',
    component: TopUpBalance
  },
  { path:  "/:catchAll(.*)", component: Netflix }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
