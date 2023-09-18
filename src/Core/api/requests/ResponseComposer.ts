import { ServerResponseType } from "../dataTypes"
import { ConsoleLogger } from "../../Logger/ConsoleLogger";

export class ResponseComposer {

    constructor() { console.log("response composer") }

    static responseCompose(Response: any, success: boolean): ServerResponseType<any> {

        let responseData: ServerResponseType<any> = {success: false, code: 400, message: "loo", data: {}};

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
                responseData.message = "ERROR";
                responseData.success = false;    
                localStorage.setItem("network", "true");
                return responseData;

            } else {

                ConsoleLogger.writeLogError("[COMPOSER] An unexpected error has occurred. Check the network connection and the Internet is not available.");
                responseData.code = 0;
                responseData.data = { "message":"An unexpected error has occurred. Check the network connection and the Internet is not available."};
                responseData.message = "An unexpected error has occurred. Check the network connection and the Internet is not available.";
                responseData.success = false;
                localStorage.removeItem('network');
                return responseData;

            }

        }
        }
    }

