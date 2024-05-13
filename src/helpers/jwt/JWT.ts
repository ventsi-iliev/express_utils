import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/UserPayload';

export class JWT_Manager {
    static sign(data: UserPayload, sessionKey: string, jwtKey: string) {
        const token = jwt.sign(data, jwtKey);

        return token;
    }

    static verify(req: Request, sessionKey: string, jwtKey: string) {
        try {
            let payload = jwt.verify(req.session.token, jwtKey) as UserPayload;

            return payload;
        } catch(err: any) {
            return null;
        }
    }
}