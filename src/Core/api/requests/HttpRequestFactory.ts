import { HttpAuthRequest } from "./HttpAuthRequest";
import { HttpRegisterRequest } from "./HttpRegisterRequest";
import { HttpGetRoomsRequest } from "./HttpGetRoomsRequest";
import { ServerResponseType } from "../dataTypes"
import { requestType } from "../dataTypes";

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...")
    }
    
    async makeRequest(rtype: requestType, rdata: ServerResponseType<any> ) {
        try {
            console.log("=> makeRequest with data: " + JSON.stringify(rdata));
            let HttpRequestObject = this.FactorySwitcher(rtype);
            let answer = await HttpRequestObject.makeHttpRequest(rdata);
            return answer;
        } catch(error) {
            console.warn("makeRequest failed! " + error);
            throw(error);
        }
    }

    private FactorySwitcher(rtype: requestType) {
        let HttpRequestObject;
            switch (rtype) {
                case requestType.UserAuth: {
                    HttpRequestObject = new HttpAuthRequest();
                    break;
                }
                case requestType.UserRegister: {
                    HttpRequestObject = new HttpRegisterRequest();
                    break;                    
                }
                case requestType.RoomsGet: {
                    HttpRequestObject = new HttpGetRoomsRequest();
                    break;
                }
                default: {
                    console.error("Unrecognized request type: " + JSON.stringify(rtype))
                    throw Error("[HttpRequestFactory] Unrecognized request type!");
                }
            } 
        return HttpRequestObject;
    }
}

