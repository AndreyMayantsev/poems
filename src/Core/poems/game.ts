// Main class for executing game
import User from './user'
import RoomManager from './roomManager';
import { AuthorizationResponse, UserLoginRequest } from '../api/dataTypes';
import { HttpRequestFactory } from '../api/requests/HttpRequestFactory';
import { requestType } from '../api/requests/HttpRequestFactory';
import { GameStates } from './gameStates';

export class Game {

    //private user: User;
    //private roomManager: RoomManager;
    //private inGame: InGame;
    private state: GameStates;
    private HttpRequestsFactory;

    public constructor() {
        
        this.HttpRequestsFactory = new HttpRequestFactory()
        this.state = GameStates.NonAuthorizeState;
        console.log("[Game] Created.")
        
    }

    public getGameState() { return this.state; }

    public async UserAuthorize(data: UserLoginRequest) {
        let reqMet = this.HttpRequestsFactory.makeRequest(requestType.UserAuth);
        let response = await reqMet.makeHttpRequest(data);
        console.log("[User] Authorize: " + JSON.stringify(response));

        if (response.success) {
            //let userData: AuthorizationResponse = { "token" : response.data.token, "expired_at" : response.data.expired_at, "user_id" : response.data.user_id};
            //this.user = new User(userData);
        } else {
            console.log("Void!");
        }
    }

}