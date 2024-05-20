import { Types } from "mongoose";
import { Subjects } from "./subjects";
export interface UserCreatedEvent {
    subject: Subjects.UserCreated,
    data: {
        userID: Types.ObjectId;
        username: string;
        name: string;
        profileImage?: string;
    }
}