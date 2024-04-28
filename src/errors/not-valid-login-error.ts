import { BaseError } from "./base-error";

export class NotValidLoginError extends BaseError {
    statusCode = 401;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, NotValidLoginError.prototype);
    }

    parseErrors() {
        return [
            {
                message: this.errorMsg || 'Not a valid login'
            }
        ]
    }
}