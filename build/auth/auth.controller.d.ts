import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateAuthDto: UpdateAuthDto): any;
    remove(id: string): any;
}
