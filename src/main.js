//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'

// console.log('Starting application...')
const app = createApp(App)
app.use(router)
app.mount('#app')



// pull test