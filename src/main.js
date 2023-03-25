import { createApp } from 'vue'
import { PusherSettings } from './Core-prod/Сonfigure'
import Pusher from 'pusher-js'
import {Echo} from "laravel-echo"; 
import App from './App.vue'
import router from './router/router.js'
import createStore from './store/store.js'

console.log('Starting application...')
const app = createApp(App)
app.use(router)
app.use(createStore)
//console.log("[Pusher options] " + JSON.stringify(PusherSettings))
//app.use(vuePusher, { ...PusherSettings });
app.mount('#app')

// WEB-SOCKET TRY

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