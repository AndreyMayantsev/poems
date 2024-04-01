import { ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import { sessionID } from "./seesionID";

export class HttpStartRoomRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(id: number): Promise<ServerResponseType<any>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url + id + '/start',
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

