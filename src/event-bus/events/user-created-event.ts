import { Subjects } from "./subjects";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated,
    data: {
        userID: string;
        username: string;
        name: string;
        profileImage: string;
    }
}