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

export type SendMessageResponse = {
    "success": boolean
}

export type GetRoomsResponse = {
    "room_id": number,
    "is_public": boolean,
    "places": number,
    "rows_visible": number,
    "finish_type": string,
    "finish_time_cond": number,
    "finish_moves_cond": number
}

export type GetRoomResponse = {
    "room_id": number,
    "is_public": boolean,
    "places": number,
    "rows_visible": number,
    "finish_type": string,
    "finish_time_cond": number,
    "finish_moves_cond": number
}

export type ServerResponseType<D> = {
    success: boolean;
    message: {};
    data: D;
} 

export type EndPoemResponse = {
    poem: string
}

// Requests types
export type SendMessageRequest = {
    message: string
}

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
    MakeRoom,
    SendMessage,
    EnterRoom,
    EndPoem,
    LeaveRoom
    
}

console.log(requestType);