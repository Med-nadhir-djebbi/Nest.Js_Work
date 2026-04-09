import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./user/entities/user.entity").User>;
    findAll(): Promise<import("./user/entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./user/entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./user/entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
