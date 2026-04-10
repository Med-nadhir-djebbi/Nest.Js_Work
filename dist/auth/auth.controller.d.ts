import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        cvs: import("../cv/entities/cv.entity").Cv[];
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
