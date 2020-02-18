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
// import { UsersRepository } from 'src/users/users.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: "User",
              schema: AuthSchema
            }
        ]),
    ],
    controllers: [
        AuthController, 
    ],
    providers: [
        AuthService,
        AuthRepository,
        
    ],
    exports: [
        AuthService,
        AuthRepository,
    ]
})
export class AuthModule {}
