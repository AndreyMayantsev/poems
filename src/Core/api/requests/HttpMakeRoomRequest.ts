import { CreateRoomResponse, ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import getCookie from '../getCookie';

export class HttpMakeRoomRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_MAKE_ROOM;

    async makeHttpRequest(rdata: {}): Promise<ServerResponseType<CreateRoomResponse>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url,
            data: {
                ...rdata
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes',
                'Authorization': getCookie("Token"),
            }
        }
        let req = await isAxis(axiosConfig).then((response)=> {
            return response;
        });
        return req;
    }

}

