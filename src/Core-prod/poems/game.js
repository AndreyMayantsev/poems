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
exports.Game = void 0;
const HttpRequestFactory_1 = require("../api/HttpRequestFactory");
const HttpRequestFactory_2 = require("../api/HttpRequestFactory");
const gameStates_1 = require("./gameStates");
class Game {
    constructor() {
        this.HttpRequestsFactory = new HttpRequestFactory_1.HttpRequestFactory();
        this.state = gameStates_1.GameStates.NonAuthorizeState;
    }
    getGameState() { return this.state; }
    UserAuthorize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let reqMet = this.HttpRequestsFactory.makeRequest(HttpRequestFactory_2.requestType.UserAuth);
            let response = yield reqMet.makeHttpRequest(data);
            console.log("[User] Authorize: " + JSON.stringify(response));
            if (response.success) {
                //let userData: AuthorizationResponse = { "token" : response.data.token, "expired_at" : response.data.expired_at, "user_id" : response.data.user_id};
                //this.user = new User(userData);
            }
            else {
                console.log("Void!");
            }
        });
    }
}
exports.Game = Game;
