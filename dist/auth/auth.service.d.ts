import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        cvs: import("../cv/entities/cv.entity").Cv[];
    } | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        cvs: import("../cv/entities/cv.entity").Cv[];
    }>;
}
