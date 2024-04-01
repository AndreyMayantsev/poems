import { SendMessageResponse, ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import { sessionID } from "./seesionID";

export class HttpSendMessageRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(rdata: {}, id: number): Promise<ServerResponseType<SendMessageResponse>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url + id + "/message",
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes',
                'Authorization': sessionID.getSessionID(),
            },
            data: {
                ...rdata
            }
        }
        let req = await isAxis(axiosConfig).then((response)=> {
            return response;
        });
        return req;
    }

}

// message