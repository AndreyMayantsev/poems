import axios from 'axios'
import { ServerResponseType } from '../dataTypes';

/**
 * 
 * @param url - api entrypoint url 
 * @param rdata - request data for api-request
 * @returns 
 */

export async function isAxis(rurl: string, rdata: {}): Promise<ServerResponseType<any>> {
    
    console.log('isAxis makes request to: ' + rurl);

    try {
        const response = await axios({
            method: 'POST',
            url: rurl,
            data: {
                ...rdata
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Develop-Mode': 'yes'
            }
        })
        return response.data;
    
    } catch(error) {
        console.error("isAxis(), Request failed: " + JSON.stringify(error)); 
        throw error;       
    }
}