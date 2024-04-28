import { Request, Response, NextFunction } from 'express';
import { JWT } from '../helpers/jwt/JWT';

export const processJwtPayload = (sessionKey: string, jwtKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.session && !req.session[sessionKey]) {
            return next();
        }

        JWT.verify(req, 'token', jwtKey);
    }
}