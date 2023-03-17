import { createStore } from 'vuex'

import movies from './modules/movies'
import auth from './modules/auth'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    auth
  }
})