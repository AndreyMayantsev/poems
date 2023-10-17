import { LoggerInterface } from "./LoggerInterface";
import { Configure } from "../Сonfigure";

export class ConsoleLogger implements LoggerInterface {

    logName: string;

    constructor(logName: string) {
        this.logName = logName;
     }

    public writeLogInfo(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.log("[" + this.logName + "] INFO: " + message);
        }
    }

    public writeLogWarning(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.warn("[" + this.logName + "] WARNING: " + message);
        }
    }

    public writeLogError(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.error("[" + this.logName + "] ERROR: " + message);
        }
    }

}