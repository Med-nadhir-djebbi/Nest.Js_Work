import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerUserDto: RegisterUserDto): Promise<Partial<User>>;
    login(loginCredentialsDto: LoginCredentialsDto): Promise<{
        access_token: string;
    }>;
}
