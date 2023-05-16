import axios from 'axios'
import { Configure } from '../../Сonfigure'
import { ServerResponseType } from '../dataTypes';
import { ResponseComposer } from './ResponseComposer';

export async function isAxis(config: any): Promise<ServerResponseType<any>> {

    let response = axios(config)
        .then(resp => {
            // Success codes response
            console.log("[Axios] OK ");
            let response = ResponseComposer.responseCompose(resp, true);
            return response
        })
        .catch(result => {
            // Error from server (ISE)
            if (result.response) {
                console.log("[Axios] Server returns error: " + result.response.status);
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            // Bad request codes (without response)  
            } else if (result.request) {
                console.log("[Axios] BadRequest returnes from " + config.url);
                console.log("[Axios] Response: " + JSON.stringify(result));
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            // Local connection errors    
            } else {
                console.error('[Axios] Can not connect to: ' + config.url);
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            }
    }); 
     
    return response;
    
}