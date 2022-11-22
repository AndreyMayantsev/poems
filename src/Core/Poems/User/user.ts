import { createConditionalExpression } from '@vue/compiler-core';
import { requestType, ServerResponseType, UserLoginRequest, UserRegisterRequest } from '../../api/dataTypes';
import { AuthorizationResponse } from '../../api/dataTypes'
import { HttpRequestFactory } from '../../api/requests/HttpRequestFactory';
import { authResult, UserInterface } from './userInterface';


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

    /**
     * I think is safety =)
     * @returns public information about user. 
     */
    public getPublicInfo() {
        let _publicInfo = {
            "name": this.userName,
            "id:": this.userID
        }
        return _publicInfo;
    }

    public async userLogin( _loginData: UserLoginRequest ): Promise<authResult> {
        let _result: authResult = {result: false, message: ""};

        try {
     
            let HttpFabricInstance = new HttpRequestFactory();
            let Response = await HttpFabricInstance.makeRequest( requestType.UserAuth, _loginData );

            if (Response.data.success) {
                console.log("Успешно получен ответ на запрос авторизации: " + JSON.stringify(Response));

                this.userName = "Тестовый Тест";
                this.userID = Response.data.data.user_id;
                this.userToken = Response.data.data.token;
                this.tokenExpired = Response.data.data.expired_at;
                this.autorized = true;

                console.log(JSON.stringify(this.getPublicInfo()));
                console.log("Пользователь авторизован!");

                _result.message = JSON.stringify( this.getPublicInfo );
                _result.result = true;

                return _result;
            } 

            _result.message = Response.data.message;
            _result.result = false;

            console.log("При авторизации произошла ошибка!");
            return _result;
                
        } catch(error) {
            console.log("[User] Authorization error!")
            throw(error);
        }
    }

    public async userRegistration( _regData: UserRegisterRequest ): Promise<authResult> {
        let _result: authResult = {result: false, message: ""};

        try {
     
            let HttpFabricInstance = new HttpRequestFactory();
            let Response = await HttpFabricInstance.makeRequest( requestType.UserRegister, _regData );

            if(Response.data.success) {
                console.log("Успешно получен ответ на запрос регистрации: " + JSON.stringify(Response));

                this.userName = "Зарегистрировавшийся Тест";
                this.userID = Response.data.data.user_id;
                this.userToken = Response.data.data.token;
                this.tokenExpired = Response.data.data.expired_at;
                this.autorized = true;

                console.log(JSON.stringify(this.getPublicInfo()));
                console.log("Пользователь зарегистрирован!");

                _result.message = JSON.stringify( this.getPublicInfo );
                _result.result = true;
                return _result;
            } 

            _result.message = Response.data.message;
            _result.result = false;

            console.log("При регистрации произошла ошибка!");
            return _result;

        } catch(error) {
            console.log("[User] Registration error!")
            throw(error);
        }
    }

    public userTokenExpired(): boolean {
        return false;
    }

    public userLogout() {

        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
        this.autorized = false;

    }

}

