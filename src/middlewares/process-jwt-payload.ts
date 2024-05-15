import { Request, Response, NextFunction } from 'express';
import { JWT_Manager } from '../helpers/jwt/JWT';
import { UserPayload } from '../interfaces/UserPayload';

export const processJwtPayload = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session && !req.session.token) {
        return next();
    }

    console.log(req.headers);

    const payload = JWT_Manager.verify(req, 'token', process.env.JWT_KEY!) as UserPayload;

    if(payload) {
        req.currentUser = payload;
    }
    next();
}