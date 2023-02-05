
export let Configure = {

    // VERSION
    POEMS_VERSION : "0.1",
    POEMS_BUILD : "PRE-TEST",

    // CONSTS
    DEBUG_MODE: false,

    // URLS
    BASE_URL : "http://127.0.0.1:80", 
    URL_USER_REGISTER : "/api/user/register/",
    URL_USER_LOGIN : "/api/user/login/",
    URL_MAKE_ROOM : "/api/room/", 
    URL_GET_ROOMS: "/api/rooms/",
    URL_GET_ROOM : "/api/rooms/", 

    // Pusher options
    Pusher: {
        options:{
            broadcaster: 'pusher',
            host: 'localhost:6001',
            key: '645646',
            cluster: 'mt1',
            useTLS: false,
            secret: '4234341'
        }
    }
}