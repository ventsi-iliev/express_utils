import jwt from 'jsonwebtoken';
import { Request } from 'express';

export class JWT {
    static sign(data: {
        [key: string]: any
    }, jwtKey: string, req: Request) {
        const token = jwt.sign(data, jwtKey);

        req.session = {
            token
        }
        return token;
    }
}