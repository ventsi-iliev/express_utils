import jwt from 'jsonwebtoken';

export class JWT {
    static sign(data: {
        [key: string]: any
    }, jwtKey: string) {
        const token = jwt.sign(data, jwtKey);

        return token;
    }
}