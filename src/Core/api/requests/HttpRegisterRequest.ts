import { RegistrationResponse, ServerResponseType, UserLoginRequest } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";

export class HttpRegisterRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_USER_REGISTER;

    async makeHttpRequest(data: {}): Promise<ServerResponseType<RegistrationResponse>> {
        try { 
            let req;
            req = await isAxis(this.url, data).then((response)=> {
                return response;
            });
            return req;
        } catch(error) {
            console.error("[MakeHttpRequest]: Error occured!");
            throw(error); 
        }
    }

}