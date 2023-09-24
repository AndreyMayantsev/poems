
export const Configure = {

    // VERSION
    POEMS_VERSION : "0.1",
    POEMS_BUILD : "PRE-TEST",

    // CONSTS 
    DEBUG_MODE: true,

    // BASE URL TO BACKEND
    // AND OTHER ROUTES
    // MODIFY THIS 

    BASE_URL : "http://127.0.0.1:80", 
    URL_USER_REGISTER : "/api/user/register/",
    URL_USER_LOGIN : "/api/user/login/",
    URL_MAKE_ROOM : "/api/room/", 
    URL_GET_ROOMS: "/api/rooms/",
    URL_GET_ROOM : "/api/rooms/", 

}

// Pusher options
//PUSHER_APP_ID=42323423
//PUSHER_APP_KEY=645646
//PUSHER_APP_SECRET=4234341
//PUSHER_APP_CLUSTER=mt1

// export const PusherSettings = {
//         url: 'http://localhost:6001',
//         app_key:'645646',
//         options:{
//             broadcaster: 'pusher',
//             host: 'localhost:6001',
//             key: '645646',
//             cluster: 'mt1',
//             useTLS: false,
//             secret: '4234341'
//         }
//     }