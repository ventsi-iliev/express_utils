import { Types } from "mongoose";
import { Subjects } from "./subjects";
export interface UserCreatedEvent {
    subject: Subjects.UserCreated,
    data: {
        userId: Types.ObjectId;
        username: string;
        name: string;
        profileImage?: string;
    }
}