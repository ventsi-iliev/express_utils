
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

function notOwnProfile(req: Request, res: Response, next: NextFunction) {
    if(req.currentUser!.username !== req.params.username) {
        throw new NotAuthorizedError('This is not your profile to edit!');
    }

    return next();
}

export { notOwnProfile };