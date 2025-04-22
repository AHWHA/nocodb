import { ILexingError, IRecognitionException } from "chevrotain";
import { NcSDKError } from "../errorUtils";
export interface InvalidFilterErrorInfo {
    lexingError?: ILexingError[];
    parsingError?: IRecognitionException[];
    message?: string;
}
export declare class InvalidFilterError extends NcSDKError {
    readonly info: InvalidFilterErrorInfo;
    constructor(info: InvalidFilterErrorInfo);
}
