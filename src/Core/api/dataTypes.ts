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

export type GetRoomsResponse = {
    room_id: number;
    is_public: boolean;
    places: number;
    rows_visible: number;
    move_duration: number;
    finish_type: string;
    finish_time_cond: number;
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

export enum requestType {
    UserAuth,
    UserRegister,
    RoomGet,
    RoomMake
}

console.log(requestType);