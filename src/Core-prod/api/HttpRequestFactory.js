"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestFactory = exports.requestType = void 0;
const HttpAuthRequest_1 = require("./HttpAuthRequest");
var requestType;
(function (requestType) {
    requestType[requestType["UserAuth"] = 0] = "UserAuth";
    requestType[requestType["UserRegister"] = 1] = "UserRegister";
    requestType[requestType["RoomGet"] = 2] = "RoomGet";
    requestType[requestType["RoomMake"] = 3] = "RoomMake";
})(requestType = exports.requestType || (exports.requestType = {}));
class HttpRequestFactory {
    constructor() {
        console.log("[HttpRequestFactory] Created...");
    }
    makeRequest(type) {
        let HttpRequestObject = null;
        switch (type) {
            case requestType.UserAuth: {
                HttpRequestObject = new HttpAuthRequest_1.HttpAuthRequest;
                break;
            }
            default: {
                console.error("Unrecognized request type: " + type);
                throw new Error("[HttpRequestFactory] Unrecognized request type!");
            }
        }
        return HttpRequestObject;
    }
}
exports.HttpRequestFactory = HttpRequestFactory;
