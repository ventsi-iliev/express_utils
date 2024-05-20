import { Types } from "mongoose";
import { Subjects } from "./subjects";

export interface PostCreatedEvent {
    subject: Subjects.PostCreated;
    data: {
        userID: Types.ObjectId;
        postID: Types.ObjectId;
        resourceURL: string;
        type: 'image' | 'video';
        version: number;
    }
}