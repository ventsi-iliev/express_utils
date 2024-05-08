import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/UserPayload';

export class JWT_Manager {
    static sign(data: UserPayload, sessionKey: string, jwtKey: string) {
        const token = jwt.sign(data, jwtKey);

        console.log(token);

        return token;
    }

    static verify(req: Request, sessionKey: string, jwtKey: string) {
        try {
            console.log(req.session.token);
            console.log('---------');
            console.log(jwtKey);
            console.log('---------');
            const payload = jwt.verify(req.session[sessionKey], jwtKey) as UserPayload;
            const payload2 = jwt.verify(req.session.token, jwtKey) as UserPayload;

            console.log('payload 1', payload);
            console.log('payload 1', payload2);

            return payload;
        } catch(err: any) {
            return null;
        }
    }
}