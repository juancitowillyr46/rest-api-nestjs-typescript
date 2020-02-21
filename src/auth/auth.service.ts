import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcryptjs';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthRepository } from './auth.repository';
// import { AuthDto } from './dto/auth.dto';
// import { UsersModule } from 'src/users/users.module';
// import { UsersService } from './../users/users.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        
        private authRepository: AuthRepository,
        private readonly jwtService: JwtService
        // @Inject(forwardRef(() => UsersService))
        // private readonly usersService: UsersService
    ){}

    async signIn(request: AuthSignInDto): Promise<any>  {
        let response: { data; statusCode; message; error };
        const result = await this.authRepository.signIn(request);
        if(result !== null) {
            const comparePassword = await compare(request.password, result.password);
            if(comparePassword){
                const payload = { username: result.username, sub: result.id };
                const accessToken = this.jwtService.sign(payload);
                response = {
                    data: { accessToken },
                    statusCode: 200,
                    message: 'Welcome',
                    error: false
                }
            } else {
                response = {
                    data: result,
                    statusCode: 400,
                    message: 'Error login',
                    error: true
                }
            }
            
        } else {
            response = {
                data: result,
                statusCode: 400,
                message: 'Error login user not exist',
                error: true
            }
        }
    
        return response;

    }   

    async signUp(request: AuthSignUpDto) {
        let response: { data; statusCode; message; error };
        let exist = false;

        await this.authRepository.validateUser(request.email).then((res) => exist = res);
        if(exist) {
            return response = {
                data: null,
                message: 'User exist in database',
                statusCode: 400,
                error: true
            };
        }

        const salt = await genSalt(10);
        const password = (await hash(request.password, salt));
        request.password = password;
        const result = await this.authRepository.signUp(request);
        if(result){
            response = {
                data: result,
                statusCode: 200,
                message: 'Usuario creado satisfactoriamente',
                error: true
            }
        } else {
            response = {
                data: result,
                statusCode: 400,
                message: 'Usuario no creado',
                error: false
            }
        }

        return response;

    }

    // async validate(username: string, pass: string) {
    //     const result = await this.authRepository.validateLogin();
    // }

}
