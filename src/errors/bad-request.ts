import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
    statusCode: number = 400;

    constructor(public errorMsg: string) {
        super(errorMsg);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    parseErrors() {
        return [
            {
                message: this.errorMsg
            }
        ]
    }
}