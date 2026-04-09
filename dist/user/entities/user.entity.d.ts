import { Cv } from '../../cv/entities/cv.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    cvs: Cv[];
}
