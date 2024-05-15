import { BaseError } from "./base-error";
import generalStrings from '../strings/general-strings.json';

export class DatabaseConnectionFailedError extends BaseError {
    statusCode: number = 500;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, DatabaseConnectionFailedError.prototype);
    }

    parseErrors() {
        return [
            {
                message: generalStrings['database-connection-failed']
            }
        ]
    }
}