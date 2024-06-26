export const Configure = {

    // VERSION
    POEMS_VERSION : "0.2",
    POEMS_BUILD : "PRE-TEST",

    // CONSTS 
    DEBUG_MODE: true,

    // BASE URL TO BACKEND
    // AND OTHER ROUTES
    // MODIFY THIS 

    BASE_URL : "http://" + process.env.VUE_APP_BASE_URL, 
    URL_USER_REGISTER : "/api/user/register/",
    URL_USER_LOGIN : "/api/user/login/",
    URL_MAKE_ROOM : "/api/room/", 
    URL_GET_ROOMS: "/api/rooms/",
    URL_GET_ROOM : "/api/rooms/", 

}
