import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
    statusCode = 401;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    parseErrors() {
        return [
            {
                message: this.errorMsg || 'Not authorized!'
            }
        ]
    }
}