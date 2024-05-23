export class ActiveGame {

    public static setActiveGame(userID: string, gameID: number) {
        let _activeGamesList = this.getActiveGamesList();
        _activeGamesList[userID]=gameID;
        localStorage.setItem("activeGame", JSON.stringify(_activeGamesList));
    }

    public static getActiveGame(userID: string) {
        return this.getActiveGamesList()[userID];
    }

    public static unsetActiveGame(userID: string) {
        let _activeGamesList = this.getActiveGamesList();
        delete _activeGamesList[userID];
        localStorage.setItem("activeGame", JSON.stringify(_activeGamesList));
    }

    public static getActiveGamesList() {
        let _activeGameInfo = localStorage.getItem("activeGame");
        if (_activeGameInfo) {
            return JSON.parse(_activeGameInfo);            
        } else {
            return {}
        }
    }

}