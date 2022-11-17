"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestType = void 0;
var requestType;
(function (requestType) {
    requestType[requestType["UserAuth"] = 0] = "UserAuth";
    requestType[requestType["UserRegister"] = 1] = "UserRegister";
    requestType[requestType["RoomGet"] = 2] = "RoomGet";
    requestType[requestType["RoomMake"] = 3] = "RoomMake";
})(requestType = exports.requestType || (exports.requestType = {}));
console.log(requestType);
