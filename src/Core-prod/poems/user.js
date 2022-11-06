"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(authorizationData) {
        this.userName = "default";
        this.userID = authorizationData.user_id;
        this.userToken = authorizationData.token;
        this.tokenExpired = authorizationData.expired_at;
        console.log("[User] user_id: " + this.userID + " created!");
    }
    logOut() {
        // 
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
    }
}
exports.default = User;
