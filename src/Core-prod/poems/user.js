"use strict";
// commited from windows maxhine!
// test merge
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(authorizationData) {
        this.userID = authorizationData.user_id;
        this.userToken = authorizationData.token;
        this.tokenExpired = authorizationData.expired_at;
        this.userName = this.getUserName(this.userID, this.userToken);
        console.log("[User] user_id: " + this.userID + " created!");
    }
    getUserName(user_id, uset_token) {
        // get username from server
        let _username = "pass";
        return _username;
    }
    logOut() {
        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
    }
}
exports.default = User;
