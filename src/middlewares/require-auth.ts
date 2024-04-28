import { Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        throw new NotAuthorizedError('Forbidden access! You should authorize yourself!');
    }

    console.log('Authorized User!');
    next();
}