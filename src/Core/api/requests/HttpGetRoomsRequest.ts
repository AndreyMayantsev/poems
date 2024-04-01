import { GetRoomsResponse, RoomsListGetRequest, ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import { sessionID } from "./seesionID";

export class HttpGetRoomsRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(data: {}): Promise<ServerResponseType<GetRoomsResponse>> {

        let axiosConfig = {
            method: 'GET',
            url: this.url,
            data: {
                ...data
            },
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

