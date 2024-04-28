import { Model } from "mongoose";
import { DuplicateUserError } from "../../errors/duplicate-user-error";

export async function checkForDuplicateUser(model: typeof Model, email: string, errorMsg?: string) {
    const user = await model.findOne({ email });

    console.log(user);

    if(user) {
        throw new DuplicateUserError(errorMsg || 'Existing user');
    }

    return false;
}