import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import App from './App.vue'
import router from './router/router.js'
import createStore from './store/store.js'

// Import Quasar css
import 'quasar/dist/quasar.css'

import iconSet from 'quasar/icon-set/fontawesome-v6'

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
    iconSet: iconSet
});

app.mount('#app');



/* Pusher js

var room = "poem_room_" + 1 +  "_user_" + 1;

console.log("WS:Pusher: " + JSON.stringify(PusherSettings));
console.log("WS_ROOM: " + room);

window.Pusher = Pusher;

window.Echo = new Echo({
    ...PusherSettings
});

Echo.channel(room)
.listen('enter', function(e) {
    console.log('Listening RoomMessage...');
    console.log('RoomMessage: ' + e);
})
.listen('message', function(e) {
    console.log('Listening RoomMessage...');
    console.log('RoomMessage: ' + e);
}) 

*/