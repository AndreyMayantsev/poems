import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import vuex from 'vuex'

console.log('Starting application...')
const app = createApp(App)
app.use(router)
app.use(vuex)
app.mount('#app')
