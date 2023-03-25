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
        console.log("[User] Default user created: " + JSON.stringify(this.getPublicInfo()))

    }

    public getPublicInfo() {
        let _publicInfo = {
            "name": this.userName,
            "id": this.userID
        }
        return _publicInfo;
    }

    public getTokenFromCookies() {
        return getCookie("Token");
    }

    public async userLogin( _loginData: UserLoginRequest ): Promise<authResult> {
        try {
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserAuth, _loginData );
            console.log("[userLogin] : " + JSON.stringify(HttpResponse))
            let Response = this.responseComposer(HttpResponse);
            if(Response.success) {
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
            }
            //this.authDataAccept(HttpResponse);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('userID', "" + this.userID);
            return Response;
        } catch(error) {
            console.log("[User] UserLogin returns error!" + error);
            localStorage.removeItem('auth');
            throw(error);
        }
    }

    public async userRegistration( _regData: UserRegisterRequest ): Promise<authResult> {
        try {
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserRegister, _regData );
            console.log("[before responseComposer]: " + JSON.stringify(HttpResponse)); 
            let Response = this.responseComposer(HttpResponse);
            if(Response.success) {
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
            }
            localStorage.setItem('auth', 'true');
            localStorage.setItem('userID', "" + this.userID);
            return Response;
        } catch(error) {
            console.log("[User] userRegistration returns error!" + error)
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

    public loadUserFromBrowser() {
        // localStorage.getItem('auth')
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "" + getCookie("Token");
        this.autorized = false;
        localStorage.removeItem('auth');
    }

    // Compose authRequest answer to frontend
    private responseComposer(Response: ServerResponseType<any>): authResult {
        let _result: authResult = { success: false, message: {} };
        try {
             if(Response.data.success) {    
                this.authDataAccept(Response);       
                _result.message = this.getPublicInfo();
                _result.success = true;
                return _result;
            } 
            console.log("[responseComposer] Success False: " + JSON.stringify(Response));
            _result.message = Response.message;
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
            this.userID = ResponseData.data.data.user_id;
            this.userToken = ResponseData.data.data.token;
            this.tokenExpired = ResponseData.data.data.expired_at;
            this.autorized = true;
            console.log("Пользователь зарегистрирован/автороизован! ID: " + ResponseData.data.data.user_id);
        } catch(error) {
            console.log("[User] AuthDataAcceptor error: " + error);
            throw(error);
        } 
    }

}

