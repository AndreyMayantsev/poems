import { ServerResponseType } from "../dataTypes"
import { ConsoleLogger } from "../../Logger/ConsoleLogger";
import { show_error } from "../../UI/Notifyer";

export class ResponseComposer {

    constructor() { console.log("response composer") }

    static responseCompose(Response: any, success: boolean): ServerResponseType<any> {

        let responseData: ServerResponseType<any> = {success: false, code: 400, message: "loo", data: {}};
        console.log(JSON.stringify(Response));

            if(success == true) {

                ConsoleLogger.writeLogInfo("[COMPOSER] Response.data founded! Code OK")
                responseData.code = 200;
                responseData.data = Response.data;
                responseData.message = "OK";
                responseData.success = true; 
                localStorage.setItem("network", "true");
                return responseData;

            } else {

            if (Response.response && Response.response.status >= 400) { 
                ConsoleLogger.writeLogWarning("[COMPOSER] ERROR from server: " + Response.response.status)
                responseData.code = Response.response.status;
                responseData.data = Response.response.data;
                responseData.message = Response.message;
                responseData.success = false;    
                localStorage.setItem("network", "true");
                if (Response.response.status === 401) {
                    show_error("Отсутствует авторизация");
                } else if (Response.response.status === 422) { 
                    if (Response.response.data.message) {
                        show_error(JSON.stringify(Response.response.data.message));
                    } else {
                        show_error("Неверный логин или пароль!");
                    }                      
                } else {
                    show_error("Undefined error!")
                }
                return responseData;

            } else {

                ConsoleLogger.writeLogError("[COMPOSER] An unexpected error has occurred. Check the network connection and the Internet is not available.");
                responseData.code = 0;
                responseData.data = { "message":"An unexpected error has occurred. Check the network connection and the Internet is not available."};
                responseData.message = "An unexpected error has occurred. Check the network connection and the Internet is not available.";
                responseData.success = false;
                show_error("Отсутствует сеть!");
                localStorage.removeItem('network');
                return responseData;

            }

        }
        }
    }

