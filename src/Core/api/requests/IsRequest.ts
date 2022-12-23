import axios from 'axios'
import { Configure } from '../../Сonfigure'
import { ServerResponseType } from '../dataTypes';

export async function isAxis(config: any): Promise<ServerResponseType<any>> {

    let response = axios(config)
        .then(resp => {
            // Success codes response
            console.log("[Axios] OK");
            return resp;
        })
        .catch(result => {
            // Error from server (ISE)
            if (result.response) {
                console.log("[Axios] Server returns error: " + result.response.status);
                let errorFromServer: ServerResponseType<any> = {
                    success: false,
                    message: result.response.data.message,
                    data: Configure.DEBUG_MODE ? result.response.data : { trace: "Only in debug mode!" }
                }
                console.log(JSON.stringify(errorFromServer))
                return errorFromServer;
            // Bad request codes (without response)  
            } else if (result.request) {
                console.log("[Axios] Bad request returnes from " + config.url);
                let errorFromServer: ServerResponseType<any> = {
                    success: false,
                    message: "Unknown error of request execute.", 
                    data: Configure.DEBUG_MODE ? result.response.data : { trace: "Only in debug mode!" }
                }
                return errorFromServer;
            // Local connection errors    
            } else {
                console.error('[Axios] Can not connect to: ' + config.url);
                return result
            }
    }); 
     
    return response;
}