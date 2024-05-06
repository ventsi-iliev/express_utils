import { Request, Response, NextFunction } from 'express';
import { JWT_Manager } from '../helpers/jwt/JWT';

export const processJwtPayload = (sessionKey: string, jwtKey: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.session && !req.session[sessionKey]) {
            return next();
        }

        const payload = JWT_Manager.verify(req, 'token', jwtKey);
        if(payload) {
            req.currentUser = payload;
        }
        next();
    }
}