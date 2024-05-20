import { Subjects } from "./subjects";

export interface PostCreatedEvent {
    subject: Subjects.PostCreated;
    data: {
        userID: string;
        postID: string;
        resourceURL: string;
        type: 'image' | 'video';
        version: number;
    }
}