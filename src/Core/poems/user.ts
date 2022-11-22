// commited from windows maxhine!
// test merge

import { ServerResponseType } from '../api/dataTypes';
import { AuthorizationResponse } from '../api/dataTypes'

export default class User {

    private userName: string;
    private userID: number;
    private userToken: string;
    private tokenExpired: number;
    private autorized: boolean;

    constructor(authorizationData?: AuthorizationResponse) {

        this.userID = authorizationData.user_id || 0;
        this.userToken = authorizationData.token || "";
        this.tokenExpired = authorizationData.expired_at || 0;
        this.userName = "Тестовый Пользователь №" + this.userID || "Неавторизован";
        this.autorized = false;
        console.log("[User] user_id: " + this.userID + " created!");
        
    }

    public getPublicInfo() {
        let _publicInfo = {
            "name": this.userName,
            "id:": this.userID
        }
        return _publicInfo;
    }

    public logOut() {
        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
        this.autorized = false;
    }

}

