import axios from 'axios'
import { ServerResponseType } from '../dataTypes';

export async function isAxis(config: any): Promise<ServerResponseType<any>> {
    
    // Enable sending stacktrace in server response
    let debug = false;

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
                    data: debug ? result.response.data : { trace: "Only in debug mode!" }
                }
                console.log(JSON.stringify(errorFromServer))
                return errorFromServer;
            // Bad request codes (without response)  
            } else if (result.request) {
                console.log("[Axios] Bad request returnes from " + config.url);
                let errorFromServer: ServerResponseType<any> = {
                    success: false,
                    message: result.response.data.message,
                    data: debug ? result.response.data : { trace: "Only in debug mode!" }
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