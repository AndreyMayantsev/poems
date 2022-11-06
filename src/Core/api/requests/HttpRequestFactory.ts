import { HttpAuthRequest } from "./HttpAuthRequest";
import { UserLoginRequest } from "../dataTypes"

export enum requestType {
    UserAuth,
    UserRegister,
    RoomGet,
    RoomMake
}
console.log(requestType)

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...")
    }
    
    async makeRequest(rtype: requestType, rdata: UserLoginRequest) {

        console.log("=> makeRequest starts work wirh type: ");
        let HttpRequestObject = null;
        let ans;

        switch (rtype) {
            case requestType.UserAuth: {
                console.log("Making request: " + requestType.UserAuth);
                HttpRequestObject = new HttpAuthRequest();
                ans = await HttpRequestObject.makeHttpRequest(rdata);
                return ans;
                break;
            }
            default: {
                console.error("Unrecognized request type: " + JSON.stringify(rtype))
                throw Error("[HttpRequestFactory] Unrecognized request type!");
            }
        }  
    }

    test_console(info: string) {
        console.log("===TEST===: " + info);
    }

}