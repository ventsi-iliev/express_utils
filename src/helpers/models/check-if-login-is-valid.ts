import { Model } from "mongoose";
import { UserPayload } from "../../interfaces/UserPayload";

export async function checkIfLoginIsValid(
    model: typeof Model,
    email: string,
    password: string,
    comparator: (suppliedPassword: string, storedPassword: string) => Promise<boolean>)
: Promise<{
    valid: boolean,
    additionalInfo?: {
        [Property in keyof UserPayload]?: UserPayload[Property]
    }
}> {
    const user = await model.findOne({ email });

    if(user) {
        return await Promise.resolve({
            valid: await comparator(password, user.password),
            additionalInfo: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }

    return await Promise.resolve({
        valid: false
    });
}