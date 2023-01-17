import Echo from "laravel-echo"; 

export default function openWebSocket(room_id: number, user_id: number) {
 
    let room = "poem_room_" + room_id +  "_user_" + user_id;
    console.log('WS room: ' + room);

    window.Pusher = require('pusher-js');

    console.log("WS...")
    //io = require('socket.io-client');
 
    let EchoInstance = new Echo({
        broadcaster: 'pusher',
        host: 'localhost:6001',
        key: '645646',
        cluster: 'mt1',
        useTLS: false,
        secret: '4234341'
    });

    EchoInstance.private(room)
    .listen('enter', function(e: any) {
        console.log('Listening RoomMessage...');
        console.log('RoomMessage: ' + e);
    })
    .listen('message', function(e: any) {
        console.log('Listening RoomMessage...');
        console.log('RoomMessage: ' + e);
    })   

}