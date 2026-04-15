import { Cv } from '../../cv/entities/cv.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    cvs: Cv[];
}
