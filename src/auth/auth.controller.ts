import { Controller, Post, HttpCode, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private authService: AuthService
    ){

    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() request: AuthSignInDto) {
        const result =  await this.authService.signIn(request);
        if(result.error === true){
          throw new HttpException(result.message, result.statusCode);
        }
        return result;
    }

    @Post('signup')
    @HttpCode(200)
    async signUp(@Body() request: {username: string, password: string, email: string, acceptTerms: boolean}){
        const result =  await this.authService.signUp(request);
        if(result.error === true){
          throw new HttpException(result.message, result.statusCode);
        }
        return result;
    }

}
