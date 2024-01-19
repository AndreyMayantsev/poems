import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import App from './App.vue'
import router from './router/router.js'
import createStore from './store/store.js'
//import Pusher from "pusher-js";
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
        timeout: 5000
       }
    },
});

window.Pusher = require('pusher-js');
console.log("PUSHER: " + process.env.VUE_APP_PUSHER_KEY);
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    secret: process.env.VUE_APP_PUSHER_APP_SECRET,
    forceTLS: false,
    wsHost: '127.0.0.1',
    wsPort: 6001,
    disableStats: true
});


app.mount('#app');

