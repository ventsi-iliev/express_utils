import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/UserPayload';

export class JWT_Manager {
    static sign(data: UserPayload, sessionKey: string, jwtKey: string, req: Request) {
        const token = jwt.sign(data, jwtKey);

        // req.session = {
        //     [sessionKey]: token
        // }
        req.session.token = token;
        return token;
    }

    static verify(req: Request, sessionKey: string, jwtKey: string) {
        try {
            const payload = jwt.verify(req.session[sessionKey], jwtKey) as UserPayload;

            return payload;
        } catch(err: any) {
            return null;
        }
    }
}