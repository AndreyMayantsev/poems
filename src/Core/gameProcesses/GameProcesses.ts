import { ConsoleLogger } from "../Logger/ConsoleLogger";
import { GetRoomResponse } from "../api/dataTypes";


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
            if (gameData.players[user] === myId) {
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

        if(playersInGame === 0) {
            logger.writeLogInfo("Game created");
            return gameStates.GAME_CREATED; 
        }
        if(playersInGame < gameData.places && currentUserInGame) {
            logger.writeLogInfo("Game awaits another players");
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
        if(playersInGame === gameData.places && gameData.current_user_id != myId && gameData.finish_moves_cond > gameData.messages_count) {
            logger.writeLogInfo("Game goes, another users turn " + gameData.current_user_id + " | " + myId);
            return gameStates.GAME_GOES_ANOTHER_PLAYERS_TURN; 
        }
        if(gameData.finish_moves_cond === gameData.messages_count) {
            logger.writeLogInfo("Game ended");
            return gameStates.GAME_ENDED; 
        }

    }

    // Calculate percent of game for view in progressBar
    public static calculateGameProgressPercent(room: GetRoomResponse) {
        if (room.finish_type === "moves") {    
            let maxTurns = room.finish_moves_cond;
            let nowTurn = room.messages_count;
            return ( nowTurn / (maxTurns / 100) ) / 100;
        } else {
            let nowTime = Date.now();
            let maxTime = Date.parse(room.created_at) + room.finish_time_cond;
            return ( nowTime / (maxTime / 100) ) / 100;
        }
    }

    // Compose players list
    public static composeRoomUsers(room: GetRoomResponse) {
        let usersList = {
            last_message_at: room.last_message_at,
            data:[]
        }

        logger.writeLogInfo("Максимально пользователей " + room.places);
        logger.writeLogInfo("Пользователи в игре " + room.players)
        for(let user in room.players) {
            let _tmpUser = {
                id: room.players[user],
                in_game: true,
                playing_now: room.players[user] == room.current_user_id ? true : false
            }
            logger.writeLogInfo("REAL USER " + JSON.stringify(_tmpUser));
            usersList.data.push(_tmpUser);
        }
        for(let i = 1; i < room.places - room.players.length + 1; i++) {
            let _tmpUser = {
                id: 0,
                in_game: false,
                playing_now: false
             }
            usersList.data.push(_tmpUser);
        }
        logger.writeLogInfo("Список пользователей " + JSON.stringify(usersList));

        return usersList;
    }

}