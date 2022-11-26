import { CreateRoomResponse, ServerResponseType } from "../dataTypes";
import { isAxis } from "./IsRequest";
import { Configure } from "../../Сonfigure";
import { HttpRequestInterface } from "./HttpRequestInterface";
import getCookie from '../getCookie';

export class HttpMakeRoomRequest implements HttpRequestInterface {

    private url = Configure.BASE_URL + Configure.URL_GET_ROOMS;

    async makeHttpRequest(data: {}): Promise<ServerResponseType<CreateRoomResponse>> {

        let axiosConfig = {
            method: 'GET',
            url: this.url,
            data: {
                ...data
            },
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

