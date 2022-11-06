/*
    Base HTTP request
    @url - from config (see more in Configure.ts)
    @rdata - from function call 
*/

import axios from 'axios'
import { ServerResponseType } from './dataTypes';

/**
 * 
 * @param url - api entrypoint url 
 * @param rdata - request data for api-request
 * @returns 
 */

export async function isAxis(url: string, rdata: {}): Promise<ServerResponseType<any>> {
    console.log('isAxis: ' + url);

    try {
        const response = await axios({
            method: 'POST',
            url: url,
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
        console.log("isAxis(), Request failed: " + JSON.stringify(error)); 
        throw error;       
    }
}