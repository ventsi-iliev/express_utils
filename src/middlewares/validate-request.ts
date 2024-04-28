import { FieldValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { PostRequestValidationError } from '../errors/post-request-validation-error';

function validateRequest(typeOfRequest: string, statusCode: number, errorMsg?: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(typeOfRequest.toUpperCase() === 'POST') {
            const errors = validationResult(req);

            console.log(errors);

            if(!errors.isEmpty()) {
                if(!errorMsg) {
                    errorMsg = (errors.array() as Array<FieldValidationError>).map(el => el.msg).join('! ') + '!'
                }

                throw new PostRequestValidationError(errors.array(), statusCode, errorMsg !== '' ? errorMsg : undefined);
            } else {
                return next();
            }
        } else {
            return next();
        }
    }
}

export { validateRequest };