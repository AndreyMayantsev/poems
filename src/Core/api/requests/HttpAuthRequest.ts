import { AuthorizationResponse, ServerResponseType, UserLoginRequest } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";

export class HttpAuthRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_USER_LOGIN;

    async makeHttpRequest(data: {}): Promise<ServerResponseType<AuthorizationResponse>> {

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
        let req = await isAxis(axiosConfig).then((response)=> {
            return response;
        });
        return req;

    }
    
}