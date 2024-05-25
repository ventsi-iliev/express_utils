import { Types } from "mongoose";
import { Subjects } from "./subjects";

export interface NotificationStatusUpdatedEvent {
    subject: Subjects.NotificationStatusUpdated;
    data: {
        userID: Types.ObjectId,
        status: 'new' | 'old',
        version: number
    }
}