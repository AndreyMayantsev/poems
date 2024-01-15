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

     public static checkGammeState(gameData: any, myId: Number) {
        logger.writeLogInfo("" + gameData + myId)
        return gameStates.GAME_CREATED;
    }

    // private static isGameAwaitPlayers(playes: any, myId: Number) {
    //     logger.writeLogInfo("Is game await players? And Me too?");

    // }

    // private static isGameGoes(whoPlayingNow: Number, myId: Number, nowPlaying: Number) {
    //     logger.writeLogInfo("Who plying now?");
    // }

    // private static isGameEnded(maxTurns: Number, nowTurn: Number, myId: Number) {
    //     logger.writeLogInfo("Game is Ended?");
    // }

}