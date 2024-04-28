import { BaseError } from "./base-error";
export class NotFoundError extends BaseError {
    statusCode = 404;

    constructor(public errorMsg: string) {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    parseErrors() {
        return [{ message: this.errorMsg || 'Not Found' }];
    }
}