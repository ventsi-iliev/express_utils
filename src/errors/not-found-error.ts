import { adjustChain } from "../helpers/adjustChain";
import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
    statusCode = 404;

    constructor(public errorMsg: string) {
        super('Route not found');

        adjustChain.call(this);
    }

    parseErrors() {
        return [{ message: this.errorMsg || 'Not Found' }];
    }
}