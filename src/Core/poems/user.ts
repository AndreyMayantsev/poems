// commited from windows maxhine!
// test merge

import { ServerResponseType } from '../api/dataTypes';
import { AuthorizationResponse } from '../api/dataTypes'

export default class User {

    private userName: string;
    private userID: number;
    private userToken: string;
    private tokenExpired: number;

    constructor(authorizationData: AuthorizationResponse) {

        this.userID = authorizationData.user_id;
        this.userToken = authorizationData.token;
        this.tokenExpired = authorizationData.expired_at;
        this.userName = this.getUserName(this.userID, this.userToken);

        console.log("[User] user_id: " + this.userID + " created!");
    }

    private getUserName(user_id: number, uset_token: string): string {
        // get username from server
        let _username = "pass";
        return _username;
    }

    public logOut() {
        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
    }

}

