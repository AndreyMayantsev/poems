import { ServerResponseType } from "../dataTypes";


export interface HttpRequestInterface {

    makeHttpRequest(data: {}, id?: number) : Promise<ServerResponseType<any>>;

}