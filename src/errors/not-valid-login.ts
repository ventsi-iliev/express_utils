import { BaseError } from "./base-error";

export class NotValidLogin extends BaseError {
    statusCode = 401;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, NotValidLogin.prototype);
    }

    parseErrors() {
        return [
            {
                message: this.errorMsg || 'Not a valid login'
            }
        ]
    }
}