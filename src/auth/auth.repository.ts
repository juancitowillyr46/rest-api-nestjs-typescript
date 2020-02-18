import { Injectable } from "@nestjs/common";
import { AuthSignInDto } from "./dto/auth-signin.dto";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/interfaces/user.interface";

@Injectable()
export class AuthRepository {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

    async signIn(signIn: AuthSignInDto): Promise<User> {
        const auth: User = await this.userModel.findOne({username: signIn.username}).catch(() => {
            return null;
        });
        return auth;
    }
}