import { ServerResponseType } from "../dataTypes"
import { Configure } from "../../Сonfigure";

export class ResponseComposer {

    constructor() { console.log("response composer") }

    static responseCompose(Response: any): ServerResponseType<any> {

        let responseData: ServerResponseType<any> = {success: false, code: 400, message: "loo", data: {}};

        if (Response.response) {
            console.log("[COMPOSER] Response.response data founded!")

            if (Response.response.status < 400) {
                responseData.code = Response.response.status;
                responseData.data = Configure.DEBUG_MODE ? Response.response.data : {"trace": "Only in debug mode! Please enable DEBUG_MODE in config."};
                responseData.message = Configure.DEBUG_MODE ? Response.response.data.message : {"trace": "Only in debug mode! Please enable DEBUG_MODE in config."};
                responseData.success = true;
            } else if (Response.response.status >= 400) { 
                responseData.code = Response.response.status;
                responseData.data = Configure.DEBUG_MODE ? Response.response.data : {"trace": "Only in debug mode! Please enable DEBUG_MODE in config."};
                responseData.message = Configure.DEBUG_MODE ? Response.response.data.message : {"trace": "Only in debug mode! Please enable DEBUG_MODE in config."};
                responseData.success = false;           
            }
        
        } else {

            console.log("[COMPOSER] Response.response data not founded!")
            responseData.code = 0
            responseData.data = "Error"
            responseData.message = "Error"
            responseData.success = false

        }
        
        return responseData;
    }

}