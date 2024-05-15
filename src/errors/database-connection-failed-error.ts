import { BaseError } from "./base-error";
import generalStrings from '../strings/general-strings.json';
import { replaceStringMessagePlaceholder } from "../helpers/strings/replace-string-message-placeholder";

export class DatabaseConnectionFailedError extends BaseError {
    statusCode: number = 500;
    public errorMsg;

    constructor(errorMsg?: string) {
        errorMsg = errorMsg || replaceStringMessagePlaceholder(
            generalStrings['database-connection-failed'],
            ['']
        ).trim();

        super(errorMsg);
        this.errorMsg = errorMsg;

        Object.setPrototypeOf(this, DatabaseConnectionFailedError.prototype);
    }

    parseErrors() {
        return [
            {
                message: this.errorMsg
            }
        ]
    }
}