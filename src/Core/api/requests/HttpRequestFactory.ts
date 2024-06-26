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
import { HttpStartRoomRequest } from "./HttpStartRoomRequest";
import { HttpTextRoomRequest } from "./HttpTextRoomRequest"
import { ConsoleLogger } from "../../Logger/ConsoleLogger";

export class HttpRequestFactory {

    constructor() {
        console.log("[HttpRequestFactory] Created...");      
    }

    public static async makeRequest( rtype: requestType, rdata?: any, id?: any ): Promise<ServerResponseType<any>>  {
        console.log("=> makeRequest with data: " + JSON.stringify(rdata));

                let HttpRequestObject = HttpRequestFactory.FactorySwitcher(rtype);
                let answer = await HttpRequestObject.makeHttpRequest(rdata, id);

                return answer;
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
                case requestType.StartRoom: {
                    HttpRequestObject = new HttpStartRoomRequest();
                    break;
                }
                case requestType.TextRoom: {
                    HttpRequestObject = new HttpTextRoomRequest();
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

