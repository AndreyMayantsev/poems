"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestFactory = void 0;
const HttpAuthRequest_1 = require("./HttpAuthRequest");
const HttpRegisterRequest_1 = require("./HttpRegisterRequest");
const HttpGetRoomsRequest_1 = require("./HttpGetRoomsRequest");
const dataTypes_1 = require("../dataTypes");
class HttpRequestFactory {
    constructor() {
        console.log("[HttpRequestFactory] Created...");
    }
    makeRequest(rtype, rdata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("=> makeRequest with data: " + JSON.stringify(rdata));
                let HttpRequestObject = this.FactorySwitcher(rtype);
                let answer = yield HttpRequestObject.makeHttpRequest(rdata);
                return answer;
            }
            catch (error) {
                console.warn("makeRequest failed! " + error);
                throw (error);
            }
        });
    }
    FactorySwitcher(rtype) {
        let HttpRequestObject;
        switch (rtype) {
            case dataTypes_1.requestType.UserAuth: {
                HttpRequestObject = new HttpAuthRequest_1.HttpAuthRequest();
                break;
            }
            case dataTypes_1.requestType.UserRegister: {
                HttpRequestObject = new HttpRegisterRequest_1.HttpRegisterRequest();
                break;
            }
            case dataTypes_1.requestType.RoomsGet: {
                HttpRequestObject = new HttpGetRoomsRequest_1.HttpGetRoomsRequest();
                break;
            }
            default: {
                console.error("Unrecognized request type: " + JSON.stringify(rtype));
                throw Error("[HttpRequestFactory] Unrecognized request type!");
            }
        }
        return HttpRequestObject;
    }
}
exports.HttpRequestFactory = HttpRequestFactory;
