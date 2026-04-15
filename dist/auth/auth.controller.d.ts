import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<Partial<import("../user/entities/user.entity").User>>;
    login(loginCredentialsDto: LoginCredentialsDto): Promise<{
        access_token: string;
    }>;
}
