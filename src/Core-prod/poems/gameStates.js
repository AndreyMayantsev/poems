"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStates = void 0;
var GameStates;
(function (GameStates) {
    GameStates[GameStates["NonAuthorizeState"] = 0] = "NonAuthorizeState";
    GameStates[GameStates["InRoomsListState"] = 1] = "InRoomsListState";
    GameStates[GameStates["InGameState"] = 2] = "InGameState";
})(GameStates = exports.GameStates || (exports.GameStates = {}));
console.log(GameStates);
