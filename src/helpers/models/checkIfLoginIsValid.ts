import { Model } from "mongoose";

export async function checkIfLoginIsValid(
    model: typeof Model,
    email: string,
    password: string,
    comparator: (suppliedPassword: string, storedPassword: string) => boolean)
: Promise<{
    valid: boolean,
    additionalInfo?: {
        [key: string]: string;
        id: string;
        email: string;
    }
}> {
    const user = await model.findOne({ email });

    if(user) {
        return await Promise.resolve({
            valid: await comparator(password, user.password),
            additionalInfo: {
                id: user.id,
                email: user.email
            }
        });
    } 

    return Promise.resolve({
        valid: false
    });
}