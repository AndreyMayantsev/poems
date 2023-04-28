import { ServerResponseType } from "../dataTypes"
import { Configure } from "../../Сonfigure";

export class ResponseComposer {

    constructor() { console.log("response composer") }

    static responseCompose(Response: any, success: boolean): ServerResponseType<any> {

        let responseData: ServerResponseType<any> = {success: false, code: 400, message: "loo", data: {}};

        console.log("[COMPOSER] Enter");

            if(success == true) {

                console.log("[COMPOSER] Response.data founded! Code OK")
                responseData.code = 200;
                responseData.data = Response.data;
                responseData.message = "OK";
                responseData.success = true; 
                return responseData;

            } else {

            if (Response.response.status >= 400) { 

                responseData.code = Response.response.status;
                responseData.data = Response.response.data;
                responseData.message = "ERROR";
                responseData.success = false;    
                return responseData;

            } else {

                console.log("[COMPOSER] Response.response data not founded!")
                responseData.code = 0
                responseData.data = { "message":"Fatal error: Network connection failed!"}
                responseData.message = "Error"
                responseData.success = false
                return responseData;
            

            }

        }
        }
    }

