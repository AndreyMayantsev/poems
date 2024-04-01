import { EndPoemResponse, ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import { sessionID } from "./seesionID";

export class HttpEndPoemRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(id: number): Promise<ServerResponseType<EndPoemResponse>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url + id + '/messages/finish',
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes',
                'Authorization': sessionID.getSessionID(),
            }
        }
        let req = await isAxis(axiosConfig).then((response)=> {
            return response;
        });
        return req;
    }

}