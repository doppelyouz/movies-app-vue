import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import StarRating from 'vue-star-rating'

import components from './components/UI'

const app = createApp(App);


components.forEach(component =>{
    app.component(component.name, component)
})

app.component('star-rating', StarRating.default)


app.use(store).use(router).mount('#app')