import { Types } from "mongoose";
import { Subjects } from "./subjects";

export interface NotificationCreatedEvent {
    subject: Subjects.NotificationCreated;
    data: {
        fromUser: Types.ObjectId;
        toUser: Types.ObjectId;
        notificationType: 'comment' | 'like-post' | 'like-comment' | 'reply',
        postId: Types.ObjectId,
        postImage: string
    }
}