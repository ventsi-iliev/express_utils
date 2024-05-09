import mongoose, { Types } from "mongoose";

type IdLookAlike = string | Types.ObjectId;

export class ObjectIdManager {
    public static convertToMongooseId(idLookAlike: IdLookAlike) {
        try {
            return new mongoose.Types.ObjectId(idLookAlike);
        } catch(err) {
            return `Couldn't convert it to Mongoose Object ID!`;
        }
    }

    public static compareTwoIdLookAlikes(formerId: IdLookAlike, latterId: IdLookAlike): boolean | string{
        try {
            return formerId.toString() === latterId.toString();
        } catch(err) {
            return `Couldn't compare the two LookAlike ids! Probably one or two of them are not valid ID LookAlikes!`;
        }
    }
}