import { BaseError } from "./base-error";

export class DuplicateUserError extends BaseError {
    statusCode = 403;

    parseErrors() {
        return [
            {
                message: 'User already exists'
            }
        ]
    }
}