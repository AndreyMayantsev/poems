import { HttpAuthRequest } from "./HttpAuthRequest";
import { HttpRequestInterface } from "./HttpRequestInterface";

export enum requestType {
    UserAuth,
    UserRegister,
    RoomGet,
    RoomMake
}

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...")
    }
    
    makeRequest(type: requestType): HttpRequestInterface {
        let HttpRequestObject = null;

        switch (type) {
            case requestType.UserAuth: {
                HttpRequestObject = new HttpAuthRequest;
                break;
            }
            default: {
                console.error("Unrecognized request type: " + type)
                throw new Error("[HttpRequestFactory] Unrecognized request type!");
            }
        }  
         
        return HttpRequestObject;
    }

}