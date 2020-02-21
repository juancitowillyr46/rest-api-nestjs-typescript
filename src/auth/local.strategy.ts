import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const request: AuthSignInDto = {username: username, password: password};
        const user = await this.authService.signIn(request).then((res) => res);
        if(!user && user.response.error){
            throw new UnauthorizedException();
        }
        return user;
    }
}