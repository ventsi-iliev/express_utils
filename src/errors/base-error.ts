export abstract class BaseError extends Error {
    abstract statusCode: number;

    constructor(private messageForLogging: string) {
        super(messageForLogging);

        Object.setPrototypeOf(this, BaseError.prototype);
    }

    abstract parseErrors(): Array<{message: string, field?: string}> | string
}