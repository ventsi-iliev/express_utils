import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/UserPayload';

export class JWT {
    static sign(data: UserPayload, sessionKey: string, jwtKey: string, req: Request) {
        const token = jwt.sign(data, jwtKey);

        req.session = {
            [sessionKey]: token
        }
        return token;
    }

    static verify(req: Request, sessionKey: string, jwtKey: string) {
        try {
            const payload = jwt.verify(req.session[sessionKey], jwtKey) as UserPayload;

            req.currentUser = payload;
            return true;
        } catch(err: any) {
            return false;
        }
    }
}