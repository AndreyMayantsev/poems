import { RegistrationResponse, ServerResponseType, UserLoginRequest } from "./dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";

export class HttpAuthRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_USER_REGISTER;

    /**
     * 
     * @param data - данные для запроса (словарь)
     * @returns 
     */

    async makeHttpRequest(data: {}): Promise<ServerResponseType<RegistrationResponse>> {
        let req;
        
        req = await isAxis(this.url, data).then((response)=> {
            return response;
        });
        
        console.log("makeHttpRequest(): " + JSON.stringify(req))
        return req;
    }

}