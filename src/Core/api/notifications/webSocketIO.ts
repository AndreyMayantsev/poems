import Echo from "laravel-echo"; 
//import Pusher from "pusher-js";
import { PusherSettings } from '../../Сonfigure'



export function openWebSocket(room_id: number, user_id: number) {
 
    let room = "poem_room_" + room_id +  "_user_" + user_id;
    
    console.log("WS:Pusher: " + JSON.stringify(PusherSettings));
    console.log("WS_ROOM: " + room);
    
    //window.Pusher = Pusher;

    let EchoInstance = new Echo({
        ...PusherSettings
    });
    EchoInstance.connect();
    EchoInstance.channel(room).listen('RoomMessage', function(e: any) {
        console.log('Listening RoomMessage...');
        console.log('RoomMessage: ' + e);
    })   

}