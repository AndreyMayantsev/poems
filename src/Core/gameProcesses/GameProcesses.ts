import { ConsoleLogger } from "../Logger/ConsoleLogger";

export enum gameStates {
    GAME_CREATED,
    GAME_AWAIT_ANOTHER_PLAYERS,
    GAME_AWAIT_ME,
    GAME_GOES_ANOTHER_PLAYERS_TURN,
    GAME_GOES_MY_TURN,
    GAME_ENDED,
    BAD_STATE
}

let logger = new ConsoleLogger("GameProcesses");

export class GameProcessor {

    public static checkGameState(gameData: any, myId: any) {
        
        let currentUserInGame = false;
        
        for (let user in gameData.players) {
            if (gameData.players[user] == myId) {
                logger.writeLogInfo("Im in game, myId " + myId + " current_user " + gameData.players[user]);
                currentUserInGame = true;
                break;
            } else {
                logger.writeLogInfo("Another user in game, myId " + myId + " current_user " + gameData.players[user]);
                currentUserInGame = false;
            }
        }

        logger.writeLogInfo("CurrentUserInGame: " + currentUserInGame);

        let playersInGame = gameData.players.length;

        if(playersInGame == 0) {
            logger.writeLogInfo("Game created");
            return gameStates.GAME_CREATED; 
        }
        if(playersInGame < gameData.places && currentUserInGame) {
            logger.writeLogInfo("Game awsits another players");
            return gameStates.GAME_AWAIT_ANOTHER_PLAYERS; 
        }
        if(playersInGame < gameData.places && !currentUserInGame) {
            logger.writeLogInfo("Game awaits me");
            return gameStates.GAME_AWAIT_ME; 
        }
        if(playersInGame == gameData.places && gameData.current_user_id == myId && gameData.finish_moves_cond > gameData.messages_count) {
            logger.writeLogInfo("Game goes, my turn " + gameData.current_user_id + " | " + myId);
            return gameStates.GAME_GOES_MY_TURN; 
        }
        if(playersInGame == gameData.places && gameData.current_user_id != myId && gameData.finish_moves_cond > gameData.messages_count) {
            logger.writeLogInfo("Game goes, another users turn " + gameData.current_user_id + " | " + myId);
            return gameStates.GAME_GOES_ANOTHER_PLAYERS_TURN; 
        }
        if(gameData.finish_moves_cond == gameData.messages_count) {
            logger.writeLogInfo("Game ended");
            return gameStates.GAME_ENDED; 
        }

    }


}