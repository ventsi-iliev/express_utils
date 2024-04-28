import { Response } from 'express';
import { FieldValidationError, ValidationError } from "express-validator";
import { BaseError } from "./base-error";
import { adjustChain } from '../helpers/adjustChain';

class PostRequestValidationError extends BaseError {
    constructor(public errors: Array<ValidationError>, public statusCode: number, private errorMessage: string = 'Error occured!') {
        super(errorMessage);

        adjustChain.call(this);
    }

    parseErrors() {
        if(this.errors.some(err => err.hasOwnProperty('msg'))) {
            return (this.errors as Array<FieldValidationError>).map(el => ({
                message: el.msg,
                field: el.path
            }))
        } else {
            return this.errorMessage;
        }
    }

    returnEarlyResponse(res: Response, msg: string) {
        res.send(msg);
    }
}

export { PostRequestValidationError };