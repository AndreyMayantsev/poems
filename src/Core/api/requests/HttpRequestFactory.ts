import { HttpAuthRequest } from "./HttpAuthRequest";
import { HttpRegisterRequest } from "./HttpRegisterRequest";
import { UserLoginRequest } from "../dataTypes"
import { requestType } from "../dataTypes";

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...")
    }
    
    async makeRequest(rtype: requestType, rdata: UserLoginRequest) {

        try {

            console.log("=> makeRequest with data:  "+JSON.stringify(rdata));
            let HttpRequestObject = this.FactorySwitcher(rtype);
            let answer = await HttpRequestObject.makeHttpRequest(rdata);
            console.log("<= answerData: " + JSON.stringify(answer));
            return answer;

        } catch(error) {
            console.error("[makeRequestError]: " + error);
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
                default: {
                    console.error("Unrecognized request type: " + JSON.stringify(rtype))
                    throw Error("[HttpRequestFactory] Unrecognized request type!");
                }
            } 

        return HttpRequestObject;

    }

}

