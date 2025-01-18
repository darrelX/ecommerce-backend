import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LogoutDto } from './dto/logout.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ email, password }: LoginCredentialsDto, request: Request): Promise<LoginResponse>;
    logout({ refreshToken }: LogoutDto): Promise<void>;
}
