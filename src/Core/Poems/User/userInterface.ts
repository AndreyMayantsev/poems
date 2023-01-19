import { UserLoginRequest, UserRegisterRequest } from "../../api/dataTypes";

export interface UserInterface {

    userLogin( data: UserLoginRequest ): Promise<authResult>;
    userLogout(): any;
    userTokenExpired(): boolean;
    userRegistration( data: UserRegisterRequest ): Promise<authResult>;

}

export type authResult = {
    success: boolean,
    message: object
}