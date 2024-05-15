import { Model } from "mongoose";
import { DuplicateUserError } from "../../errors/duplicate-user-error";
import generalStrings from '../../strings/general-strings.json';

export async function checkForDuplicateUser(
    model: typeof Model,
    email: string,
    username: string,
    errorMsg?: string
) {
    const user = await model.findOne({ email, username });

    if(user) {
        throw new DuplicateUserError(errorMsg || generalStrings['existing-user']);
    }

    return false;
}