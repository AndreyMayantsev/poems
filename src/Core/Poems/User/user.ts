import { requestType, ServerResponseType, UserLoginRequest, UserRegisterRequest } from '../../api/dataTypes';
import { HttpRequestFactory } from '../../api/requests/HttpRequestFactory';
import { authResult, UserInterface } from './userInterface';
import getCookie from '../../api/getCookie';


export class User implements UserInterface {

    private userName: string;
    private userID: number;
    private userToken: string;
    private tokenExpired: number;
    private autorized: boolean;

    constructor() {

        // Setting Unautorized user
        this.autorized = false;
        this.userID = -1;
        this.userToken = ""
        this.tokenExpired = 9999999999;
        this.userName = "Unautorized"
        console.log("[User] Default user created!")
        console.log(JSON.stringify(this.getPublicInfo()));

    }

    public getPublicInfo() {
        let _publicInfo = {
            "name": this.userName,
            "id:": this.userID
        }
        return _publicInfo;
    }

    public getTokenFromCookies() {
        return getCookie("Token");
    }

    public async userLogin( _loginData: UserLoginRequest ): Promise<authResult> {
        try {
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserAuth, _loginData );
            let Response = this.requestComposer(HttpResponse);
            console.log("USERLOGIN R: " + JSON.stringify(Response))
            if(Response.success) {
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
                console.log("[AUTH] COOKIE SET: " + this.getTokenFromCookies());
            }
            this.authDataAccept(HttpResponse);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('userID', "" + this.userID);
            return Response;
        } catch(error) {
            console.log("[User] Http server returns error!" + error);
            localStorage.removeItem('auth');
            throw(error);
        }
    }

    public async userRegistration( _regData: UserRegisterRequest ): Promise<authResult> {
        try {
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserRegister, _regData );
            let Response = this.requestComposer(HttpResponse);
            if(Response.success) {
                console.log("Install Cookie: " + this.userToken);
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
                console.log("[REG] COOKIE SET: " + this.getTokenFromCookies());
            }
            return Response;
        } catch(error) {
            console.log("[User] Http server returns error!" + error)
            throw(error);
        }
    }

    public userTokenExpired(): boolean {
        return false;
    }

    public userLogout() {
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
        this.autorized = false;
        localStorage.removeItem('auth');
    }

    // Compose authRequest answer to frontend
    private requestComposer(Response: ServerResponseType<any>): authResult {
        let _result: authResult = {success: false, message: ""};
        try {
             if(Response.success) {
                this.authDataAccept(Response);
                _result.message = JSON.stringify( this.getPublicInfo );
                _result.success = true;
                return _result;
            } 
            _result.message = JSON.stringify( Response.message );
            _result.success = false;
            return _result;
        } catch(error) {
            console.warn("[User] UserRequest error: " + error)
            throw(error);
        }
    }

    // Apply user data from server to this user
    private authDataAccept(ResponseData: ServerResponseType<any>) {
        try {
            this.userName = "Тестовый Тест";
            this.userID = ResponseData.data.user_id;
            this.userToken = ResponseData.data.token;
            this.tokenExpired = ResponseData.data.expired_at;
            this.autorized = true;
            console.log( JSON.stringify( this.getPublicInfo()) );
            console.log("Пользователь зарегистрирован/автороизован! ID: " + ResponseData.data.user_id);
        } catch(error) {
            console.log("[User] AuthDataAcceptor error: " + error);
            throw(error);
        } 
    }

}

