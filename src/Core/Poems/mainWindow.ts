import { Game } from "./game";
import { User } from "./User/user";

export default class mainWindow {

    private userInstance: User;
    //private gameInstance: Game;

    constructor(_user: User) {
        
        this.userInstance = _user;

        console.log("[mainWindow] create...");

    }

    public getUserInfo() { this.userInstance.getPublicInfo() }
    public check() { console.log("[MainWindow]") }

}