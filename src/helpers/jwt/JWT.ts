import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserPayload } from '../../interfaces/UserPayload';

export class JWT_Manager {
    static sign(data: UserPayload, sessionKey: string, jwtKey: string) {
        const token = jwt.sign(data, jwtKey);

        console.log('data', data);
        console.log('---------------');
        console.log(token);

        return token;
    }

    static verify(req: Request, sessionKey: string, jwtKey: string) {
        try {
            console.log(req.session.token);
            console.log('---------');
            console.log(jwtKey);
            console.log('---------');
            let payload, payload2;

            try {

                payload = jwt.verify(req.session[sessionKey], jwtKey) as UserPayload;
                payload2 = jwt.verify(req.session.token, jwtKey) as UserPayload;
            } catch(err) {
                console.log(err);
            }

            console.log('payload 1', payload);
            console.log('payload 1', payload2);

            return payload2;
        } catch(err: any) {
            return null;
        }
    }
}