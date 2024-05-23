export class sessionID {

    public static setSessionID(id: string) {
        localStorage.setItem('sessionid', "Bearer " + id);
    }

    public static getSessionID() {
        return localStorage.getItem('sessionid');
    }

    public static removeSessionId() {
        localStorage.removeItem('sessionid');
    }
 
}