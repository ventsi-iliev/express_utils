import { Subjects } from "./subjects";

export interface UserCreatedEvent {
    subject: Subjects.UserCreated,
    data: {
        username: string;
        name: string;
        profileImage?: string;
    }
}