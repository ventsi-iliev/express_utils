import { Request, Response, NextFunction } from 'express';
import { JWT_Manager } from '../helpers/jwt/JWT';

export const processJwtPayload = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session && !req.session.token) {
        return next();
    }

    const payload = JWT_Manager.verify(req, 'token', process.env.JWT_KEY!);
    if(payload) {
        req.currentUser = payload;
    }
    next();
}