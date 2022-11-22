"use strict";
// commited from windows maxhine!
// test merge
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(authorizationData) {
        this.userID = authorizationData.user_id || 0;
        this.userToken = authorizationData.token || "";
        this.tokenExpired = authorizationData.expired_at || 0;
        this.userName = "Тестовый Пользователь №" + this.userID || "Неавторизован";
        this.autorized = false;
        console.log("[User] user_id: " + this.userID + " created!");
    }
    getPublicInfo() {
        let _publicInfo = {
            "name": this.userName,
            "id:": this.userID
        };
        return _publicInfo;
    }
    logOut() {
        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
        this.autorized = false;
    }
}
exports.default = User;
