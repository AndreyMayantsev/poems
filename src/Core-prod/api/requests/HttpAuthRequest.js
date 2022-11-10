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
exports.HttpAuthRequest = void 0;
const IsRequest_1 = require("./IsRequest");
const _onfigure_1 = require("../../\u0421onfigure");
class HttpAuthRequest {
    constructor() {
        this.url = _onfigure_1.Configure.BASE_URL + _onfigure_1.Configure.URL_USER_LOGIN;
    }
    makeHttpRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let req;
            req = yield (0, IsRequest_1.isAxis)(this.url, data).then((response) => {
                return response;
            });
            console.log("makeHttpRequest(): " + JSON.stringify(req));
            return req;
        });
    }
}
exports.HttpAuthRequest = HttpAuthRequest;
