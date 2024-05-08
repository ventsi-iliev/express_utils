import { Subjects } from "./subjects";

export interface PostCreatedEvent {
    subject: Subjects.PostCreated;
    data: {
        userID: string;
        postID: string;
        imageURL: string;
        likesCount: number;
        commentsCount: number;
        type: 'image' | 'video';
    }
}