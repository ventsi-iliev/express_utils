import { Request, Response, NextFunction } from 'express';
import { JWT_Manager } from '../helpers/jwt/JWT';
import { UserPayload } from '../interfaces/UserPayload';

export const processJwtPayload = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session && !req.session.token) {
        return next();
    }

    if(!req.headers.hasOwnProperty('Ignore-Jwt-Processing')) {
        const payload = JWT_Manager.verify(req, 'token', process.env.JWT_KEY!) as UserPayload;
    
        if(payload) {
            req.currentUser = payload;
        }
    } else {
        req.currentUser = {
            id: 'fake-id',
            name: 'fake-name',
            username: 'fake-username',
            email: 'fake-email@fake.bg',
            profileImage: 'fake-image'
        }
    }

    next();
}