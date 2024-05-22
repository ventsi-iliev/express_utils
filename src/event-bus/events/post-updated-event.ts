import { Types } from "mongoose";
import { Subjects } from "./subjects";

export interface PostUpdatedEvent {
    subject: Subjects.PostUpdated;
    data: {
        userID: Types.ObjectId;
        postID: Types.ObjectId;
        likeTo: 'post' | 'comment';
        version: number;
        likesCount?: number;
        commentsCount?: number;
        type?: 'like' | 'remove-like';
    }
}