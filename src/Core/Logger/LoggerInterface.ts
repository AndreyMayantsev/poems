export interface LoggerInterface {
    
    logName: string;
    writeLogInfo(message: string): void;
    writeLogError(message: string): void;
    writeLogWarning(message: string): void;

}