import { requestType, ServerResponseType, UserLoginRequest, UserRegisterRequest } from '../../api/dataTypes';
import { HttpRequestFactory } from '../../api/requests/HttpRequestFactory';
import { authResult, UserInterface } from './userInterface';
import { ConsoleLogger } from '../../Logger/ConsoleLogger';
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
        ConsoleLogger.writeLogInfo("[User] Default user created: " + JSON.stringify(this.getPublicInfo()));

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
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserAuth, _loginData );
            ConsoleLogger.writeLogInfo("[userLogin] : " + JSON.stringify(HttpResponse))
            let Response = HttpResponse.data;
            if(Response.success) {
                this.authDataAccept(Response);
                localStorage.setItem('auth', 'true');
                localStorage.setItem('userID', "" + this.userID);
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
            }
            return Response;
    }

    public async userRegistration( _regData: UserRegisterRequest ): Promise<authResult> {
            let HttpResponse = await HttpRequestFactory.makeRequest( requestType.UserRegister, _regData );
            let Response = HttpResponse.data;
            if(Response.success) {
                this.authDataAccept(Response);
                localStorage.setItem('auth', 'true');
                localStorage.setItem('userID', "" + this.userID);
                document.cookie = encodeURIComponent("Token") + " = " + encodeURIComponent("Bearer " + this.userToken);
            }
            return Response;
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
        localStorage.removeItem('userID');
    }

    public loadUserFromBrowser() {
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "" + getCookie("Token");
        this.autorized = false;
        localStorage.removeItem('auth');
    }

    // Apply user data from server to this user
    private authDataAccept(ResponseData: ServerResponseType<any>) {
        ConsoleLogger.writeLogInfo("[USER_DATA_ACCEPTOR]" + JSON.stringify(ResponseData))
        try {
            this.userName = "Тестовый Тест";
            this.userID = ResponseData.data.user_id;
            this.userToken = ResponseData.data.token;
            this.tokenExpired = ResponseData.data.expired_at;
            this.autorized = true;
            ConsoleLogger.writeLogInfo("Пользователь зарегистрирован/автороизован! ID: " + ResponseData.data.user_id);
        } catch(error) {
            ConsoleLogger.writeLogError("[User] AuthDataAcceptor error: " + error);
            throw(error);
        } 
    }

}

