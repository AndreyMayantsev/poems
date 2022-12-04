import { ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import getCookie from '../getCookie';

export class HttpEnterRoomRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(id: number): Promise<ServerResponseType<any>> {

        let axiosConfig = {
            method: 'POST',
            url: this.url + id + '/enter',
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes',
                'Authorization': getCookie("Token"),
            }
        }

        try { 
            let req;
            req = await isAxis(axiosConfig).then((response)=> {
                return response;
            });
            return req;
        } catch(error) {
            console.error("[MakeHttpRequest]: Error occured!");
            throw(error); 
        }
    }

}

