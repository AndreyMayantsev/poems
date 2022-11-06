import { ServerResponseType } from "../dataTypes";


export interface HttpRequestInterface {

    makeHttpRequest(data: {}) : Promise<ServerResponseType<any>>;

}