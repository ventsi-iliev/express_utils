import { BaseError } from "./base-error";
import generalStrings from '../strings/general-strings.json';

export class DatabaseConnectionFailedError extends BaseError {
    statusCode: number = 500;

    parseErrors() {
        return [
            {
                message: generalStrings['database-connection-failed']
            }
        ]
    }
}