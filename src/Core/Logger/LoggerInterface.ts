export interface LoggerInterface {

    writeLogInfo(message: string): void;
    writeLogError(message: string): void;
    writeLogWarning(message: string): void;

}