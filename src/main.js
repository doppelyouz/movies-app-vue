import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import StarRating from 'vue-star-rating'

import components from './components/UI'
// import directives from './directives'

const app = createApp(App);

components.forEach(component =>{
    app.component(component.name, component)
})

app.component('star-rating', StarRating.default)

// directives.forEach(directive =>{
//     app.directive(directive.name, directive)
// })


app.use(store).use(router).mount('#app')