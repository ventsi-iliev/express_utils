import { Model } from "mongoose";

export async function checkForDuplicateUser<T extends typeof Model>(model: T, email: string, password: string) {
    const user = await model.findOne({ email });

    console.log(user);
}