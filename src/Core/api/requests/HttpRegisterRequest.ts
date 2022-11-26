import { RegistrationResponse, ServerResponseType, UserLoginRequest } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";

export class HttpRegisterRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_USER_REGISTER;

    async makeHttpRequest(data: {}): Promise<ServerResponseType<RegistrationResponse>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url,
            data: {
                ...data
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes'
            }
        }

        try { 
            let req;
            req = await isAxis(axiosConfig).then((response)=> {
                return response;
            });
            return req;
        } catch(error) {
            console.error("[MakeHttpRequest]: Error occured! " + error);
            throw(error); 
        }
    }

}