"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestType = void 0;
var requestType;
(function (requestType) {
    requestType[requestType["UserAuth"] = 0] = "UserAuth";
    requestType[requestType["UserRegister"] = 1] = "UserRegister";
    requestType[requestType["RoomsGet"] = 2] = "RoomsGet";
    requestType[requestType["RoomGet"] = 3] = "RoomGet";
    requestType[requestType["RoomMake"] = 4] = "RoomMake";
})(requestType = exports.requestType || (exports.requestType = {}));
/* export enum requestMethod {
    post = "POST",
    get = "GET",
    head = "HEAD"
} */
console.log(requestType);
