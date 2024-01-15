import axios from 'axios'
import { ConsoleLogger } from '../../Logger/ConsoleLogger';
import { ServerResponseType } from '../dataTypes';
import { ResponseComposer } from './ResponseComposer';

let logger = new ConsoleLogger("IsRequest");

export async function isAxis(config: any): Promise<ServerResponseType<any>> {

    let response = axios(config)
        .then(resp => {
            // Success codes response
            logger.writeLogInfo("[Axios] OK ");
            let response = ResponseComposer.responseCompose(resp, true);
            return response
        })
        .catch(result => {
            // Error from server (ISE)
            if (result.response) {
                logger.writeLogWarning("[Axios] Server returns error: " + result.response.status);
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            // Bad request codes (without response)  
            } else if (result.request) {
                logger.writeLogWarning("[Axios] BadRequest returnes from " + config.url);
                logger.writeLogWarning("[Axios] Response: " + JSON.stringify(result));
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            // Local connection errors    
            } else {
                logger.writeLogError('[Axios] Can not connect to: ' + config.url);
                let errorFromServer: ServerResponseType<any> = ResponseComposer.responseCompose(result, false);
                return errorFromServer;
            }
    }); 
     
    return response;
    
}