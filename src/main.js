import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import App from './App.vue'
import router from './router/router.js'
import createStore from './store/store.js'
import Echo from 'laravel-echo';

// Import Quasar css
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

console.log('Starting application...');

const app = createApp(App);
app.use(router);
app.use(createStore);
app.use(Quasar, {
    plugins: {
        Notify
    }, 
    config: {
      notify: { 
        timeout: 1000
      },
      brand: {
        primary: '#400f0f',
        secondary: '#7d441e',
        accent: '#d9711c',
    
        dark: '#1d1d1d',
        'dark-page': '#121212',
    
        positive: '#5bc273',
        negative: '#b52b3c',
        info: '#f7c948',
        warning: '#f5bd22'
      }
    },
});
console.log("BASE_URL >> " + process.env.VUE_APP_BASE_URL);
console.log("WS >> " + process.env.VUE_APP_WEBSOCKET_HOST + " / " + process.env.VUE_APP_WEBSOCKET_PORT)
window.Pusher = require('pusher-js');
console.log("PUSHER: " + process.env.VUE_APP_PUSHER_KEY);
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    secret: process.env.VUE_APP_PUSHER_APP_SECRET,
    wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
    wsPort: process.env.VUE_APP_WEBSOCKET_PORT,
    disableStats: true,
    forceTLS: false
});

app.mount('#app');

