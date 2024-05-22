import { Types } from "mongoose";
import { Subjects } from "./subjects";

export interface PostUpdatedEvent {
    subject: Subjects.PostUpdated;
    data: {
        userID: Types.ObjectId;
        postID: Types.ObjectId;
        likesCount: number;
        commentsCount: number;
        likeTo: 'post' | 'comment';
        type: 'like' | 'remove-like';
        version: number;
    }
}