import { HttpAuthRequest } from "./HttpAuthRequest";
import { HttpRegisterRequest } from "./HttpRegisterRequest";
import { HttpGetRoomsRequest } from "./HttpGetRoomsRequest";
import { ServerResponseType } from "../dataTypes"
import { requestType } from "../dataTypes";
import { HttpMakeRoomRequest } from "./HttpMakeRoomRequest";
import { HttpGetRoomRequest } from "./httpGetRoomRequest";
import { HttpSendMessageRequest } from "./HttpSendMessageRequest";
import { HttpEnterRoomRequest } from "./HttpEnterRoomRequest";
import { HttpEndPoemRequest } from "./HttpEndPoemRequest";
import { HttpLeaveRoomRequest } from "./HttpLeaveRoom";

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...");
    }
    
    public static async makeRequest( rtype: requestType, rdata?: any, id?: any ): Promise<ServerResponseType<any>> {
        try {
            console.log("=> makeRequest with data: " + JSON.stringify(rdata));
            let HttpRequestObject = HttpRequestFactory.FactorySwitcher(rtype);
            let answer = await HttpRequestObject.makeHttpRequest(rdata, id);
            console.log("<= makeRequest answer data: " + JSON.stringify(answer));
            return answer;
        } catch(error) {
            console.warn("[HttpRequestFactory] makeRequest failed! " + error + id);
            let standartResponse = { success: false, code: 0, message: "Произошла ошибка!", data: { message: error } }
            return standartResponse;
        }
    }

    private static FactorySwitcher(rtype: requestType) {
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
                case requestType.EnterRoom: {
                    HttpRequestObject = new HttpEnterRoomRequest();
                    break;
                }
                case requestType.EndPoem: {
                    HttpRequestObject = new HttpEndPoemRequest();
                    break;
                }
                case requestType.LeaveRoom: {
                    HttpRequestObject = new HttpLeaveRoomRequest();
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

