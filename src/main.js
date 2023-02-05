import { createApp } from 'vue'
//import { Configure } from './Core-prod/Core/Сonfigure'
//import vuePusher from 'vue-pusher'
import App from './App.vue'
import router from './router/router.js'
import createStore from './store/store.js'

console.log('Starting application...')
const app = createApp(App)
app.use(router)
app.use(createStore)
//app.use(vuePusher, { ...Configure.Pusher });
app.mount('#app')


