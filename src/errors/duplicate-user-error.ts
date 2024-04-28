import { BaseError } from "./base-error";

export class DuplicateUserError extends BaseError {
    statusCode = 403;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, DuplicateUserError.prototype);
    }

    parseErrors() {
        return [
            {
                message: 'User already exists'
            }
        ]
    }
}