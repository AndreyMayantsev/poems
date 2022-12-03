import { HttpAuthRequest } from "./HttpAuthRequest";
import { HttpRegisterRequest } from "./HttpRegisterRequest";
import { HttpGetRoomsRequest } from "./HttpGetRoomsRequest";
import { ServerResponseType } from "../dataTypes"
import { requestType } from "../dataTypes";
import { HttpMakeRoomRequest } from "./HttpMakeRoomRequest";
import { HttpGetRoomRequest } from "./httpGetRoomRequest";
import { HttpSendMessageRequest } from "./HttpSendMessageRequest";

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...");
    }
    
    async makeRequest( rtype: requestType, rdata?: any, id?: any ): Promise<ServerResponseType<any>> {
        try {
            console.log("=> makeRequest with data: " + JSON.stringify(rdata));
            let HttpRequestObject = this.FactorySwitcher(rtype);
            let answer = await HttpRequestObject.makeHttpRequest(rdata, id);
            return answer;
        } catch(error) {
            console.warn("[HttpRequestFactory] makeRequest failed! " + error + id);
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
                case requestType.RoomGet: {
                    HttpRequestObject = new HttpGetRoomRequest();
                    break;
                }
                case requestType.MakeRoom: {
                    HttpRequestObject = new HttpMakeRoomRequest();
                    break;
                }
                case requestType.SendMessage: {
                    HttpRequestObject = new HttpSendMessageRequest();
                    break;
                }
                default: {
                    console.error("[HttpRequestFactory] Unrecognized request type: " + JSON.stringify(rtype))
                    throw Error("[HttpRequestFactory] Unrecognized request type!");
                }
            } 
        return HttpRequestObject;
    }
}

