import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserGetDto } from "./dto/user-read.dto";
import { Model } from "mongoose";
import { User } from "./interfaces/user.interface";
import { UserCreateDto } from "./dto/user-create.dto";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async create(user: UserCreateDto): Promise<User> {
    const that = this;
    const create = new that.userModel(user);
    return await create.save();
  }

  async findAll(): Promise<User[]> {
    const that = this;
    const user = await that.userModel.find().exec();
    return user;
  }

  async read(userId: string): Promise<User> {
    const that = this;
    let find: User = await that.userModel.findById(userId);
    return find;
  }

  async update(id: string, user: UserCreateDto): Promise<User> {
    const that = this;
    let update = null;
    update = await that.userModel.findByIdAndUpdate(id, user).then((res) => {
      return res;
    }).catch(() => {
      return null;
    });
    return update;
  }

  async delete(id: string): Promise<User> {
    const that = this;
    let update = null;
    update = await that.userModel.findByIdAndRemove(id).catch(() => {
      return null;
    });
    return update;
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

  async validateUserUpdate(email: string): Promise<User> {
    const that = this;
    const find = await that.userModel.findOne({email: email}).then((res) => {
      return (res)? res : null;
    }).catch(() => {
      return null;
    });
    return find;
  }

  async validateUserById(id: string): Promise<boolean> {
    const that = this;
    const find = await that.userModel.findById(id).then((res) => {
      return (res)? true : false;
    }).catch(() => {
      return false;
    });
    return find;
  }

  async getUserByUserName(username: string): Promise<any> {
    const that = this;
    const find = await that.userModel.findOne({username: username}).then((res) => {
      return (res)? res : null;
    }).catch(() => {
      return null;
    });
    return find;
  }


}
