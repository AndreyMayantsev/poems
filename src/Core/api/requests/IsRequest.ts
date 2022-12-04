import axios from 'axios'
import { ServerResponseType } from '../dataTypes';

export async function isAxis(config: any): Promise<ServerResponseType<any>> {
    
    let response = axios(config)
            .then(resp => {
                console.log("[Axios] OK");
                return resp;
            })
            .catch(result => {
            if (result.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
                console.log("[Axios] Server returns error: " + result.response.status);
                return result.response;
            } else if (result.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
                console.log("[Axios] Bad request returnes from " + config.url);
                return result;
            } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.error('[Axios] Can not connect to: ' + config.url);
                throw result;
            }
        }); 
     
    return response;
}