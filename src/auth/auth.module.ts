import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';
// import { UsersModule } from 'src/users/users.module';
import { AuthRepository } from './auth.repository';
// import { AuthRepository } from './auth.repository';
// import { UsersRepository } from 'src/users/users.repository';
// import { UsersModule } from 'src/users/users.module';
import { UsersService } from './../users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
// import { UsersRepository } from 'src/users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: "User",
              schema: AuthSchema
            }
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),
        // UsersService, 
        // UsersRepository
    ],
    controllers: [
        AuthController, 
    ],
    providers: [
        AuthService,
        AuthRepository,
        JwtStrategy
        // UsersService, 
        // UsersRepository
    ],
    exports: [
        AuthService,
        AuthRepository,
        // UsersService, 
        // UsersRepository
    ]
})
export class AuthModule {}
