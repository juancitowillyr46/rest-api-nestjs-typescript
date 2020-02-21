import { Injectable } from "@nestjs/common";
import { AuthSignInDto } from "./dto/auth-signin.dto";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/interfaces/user.interface";
import { AuthSignUpDto } from "./dto/auth-signup.dto";

@Injectable()
export class AuthRepository {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

    async signIn(signIn: AuthSignInDto): Promise<User> {
        const auth: User = await this.userModel.findOne({username: signIn.username}).catch(() => {
            return null;
        });
        return auth;
    }

    async signUp(signUp: AuthSignUpDto): Promise<User> {
        const that = this;
        const create = new that.userModel(signUp);
        return await create.save().then((res) => {
            return res;
        }).catch((res) => {
            return null;
        });
    }

    async validateUser(email: string): Promise<boolean> {
        const that = this;
        const find = await that.userModel.findOne({email: email}).then((res) => {
            return (res)? true : false;
        }).catch(() => {
            return false;
        });
        return find;
    }

    async validateLogin(email: string): Promise<any> {
        const that = this;
        const find = await that.userModel.findOne({email: email}).then((res) => {
            return (res)? res : null;
        }).catch(() => {
            return null;
        });
        return find;
    }

}