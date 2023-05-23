import { LoggerInterface } from "./LoggerInterface";
import { Configure } from "../Сonfigure";

export class ConsoleLogger implements LoggerInterface {

    constructor() { }

    //static methods
    public static writeLogInfo(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.log("INFO: " + message);
        }
    }

    public static writeLogWarning(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.warn("WARN: " + message);
        }
    }

    public static writeLogError(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.error("ERROR: " + message);
        }
    }

    //non-static methods
    public writeLogInfo(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.log(message);
        }
    }

    public writeLogWarning(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.warn(message);
        }
    }

    public writeLogError(message: string): void {
        if(Configure.DEBUG_MODE) {
            console.error(message);
        }
    }

}