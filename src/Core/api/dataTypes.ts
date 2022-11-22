// Servers responses
export type AuthorizationResponse = {
    token: string;
    expired_at: number;
    user_id: number;
}

export type RegistrationResponse = {
    token: string;
    expired_at: number;
    user_id: number;
}

export type CreateRoomResponse = {
    room_id: number;
}

export type GetRoomsResponse =   {
    "room_id": 3,
    "is_public": true,
    "places": 3,
    "rows_visible": 2,
    "finish_type": "moves",
    "finish_time_cond": 600,
    "finish_moves_cond": 40
  }

export type ServerResponseType<D> = {
    success: boolean;
    message: {};
    data: D;
} 

// Requests types
export type UserLoginRequest = {
    login: string;
    password: string;
}

export type UserRegisterRequest = {
    login: string;
    password: string;
}

export type RoomCreateRequest = {
    is_public: boolean;
    places: number;
    rows_visible: number;
    move_duration: number;
    finish_type: string;
    finish_time_cond: number;
    finish_moves_cond: number;
}

export type RoomGetRequest = {
    // id in url string; 
}

export type RoomsListGetRequest = {
    limit: number,
    offset: number
}

export enum requestType {
    UserAuth,
    UserRegister,
    RoomsGet, 
    RoomGet,
    RoomMake
}

/* export enum requestMethod {
    post = "POST",
    get = "GET",
    head = "HEAD"
} */

console.log(requestType);