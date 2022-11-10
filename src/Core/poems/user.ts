// commited from windows maxhine!

import { ServerResponseType } from '../api/dataTypes';
import { AuthorizationResponse } from '../api/dataTypes'

export default class User {

    private userName: string = "default";
    private userID: number;
    private userToken: string;
    private tokenExpired: number;

    constructor(authorizationData: AuthorizationResponse) {
        this.userID = authorizationData.user_id;
        this.userToken = authorizationData.token;
        this.tokenExpired = authorizationData.expired_at;

        console.log("[User] user_id: " + this.userID + " created!");
    }

    public logOut() {
        // Exiting from game and app
        this.userID = 0;
        this.tokenExpired = 1;
        this.userToken = "";
    }

}

