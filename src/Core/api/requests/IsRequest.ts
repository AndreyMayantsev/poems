import axios from 'axios'
import { ServerResponseType } from '../dataTypes';

/**
 * 
 * @param url - api entrypoint url 
 * @param rdata - request data for api-request
 * @returns 
 */

export async function isAxis(config: any): Promise<ServerResponseType<any>> {
    
    let response = axios(config)
            .then(resp => {
                console.log("[isAxis] Вошли в then: " + resp);
                return resp;
            })
            .catch(result => {
            if (result.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
                console.log("[isAxios] Server returns error: " + result.response.status);
                return result.response;
            } else if (result.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
                console.log("[isAxios] Bad request: " + result.response.status);
                return result;
            } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.error('[isAxios] Fatal error:', result.message);
                throw result;
            }
        }); 
     
    return response;
}