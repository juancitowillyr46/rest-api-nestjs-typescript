import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserCreateDto } from "./dto/user-create.dto";
import { hash, genSalt, compare } from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    // @Inject(forwardRef(() => UsersRepository))
    private readonly usersRepository: UsersRepository
    ) {}

  async create(user: UserCreateDto) {
    let response: { data; statusCode; message; error };
    let exist = false;

    const salt = await genSalt(10);
    const password = (await hash(user.password, salt));
    user.password = password;

    await this.usersRepository.validateUser(user.email).then((res) => exist = res);
    if(exist) {
      response = {
        data: null,
        message: 'User exist in database',
        statusCode: 400,
        error: true
      };
      return response;
    }

    response = {
      data: (await this.usersRepository.create(user)),
      statusCode: 200,
      message: "Created successfully!",
      error: false
    };

    return response;
  }

  async read(id: string) {
    let response: { data; statusCode; message, error }; 
    let exist = false;
    exist = await this.usersRepository.validateUserById(id);

    if(!exist) {
      return response = {
        data: null,
        statusCode: 404,
        message: "No found!",
        error: true
      };
    }

    return response =  {data: (await this.usersRepository.read(id)),
      statusCode: 200,
      message: "Get successfully!",
      error: false
    };
  }

  async update(id: string, user: UserCreateDto) {
    const that = this;
    let response: { data; statusCode; message, error };
    let update = null;

    // Verificar existencia del correo electrónico
    let existEmail: any = await that.usersRepository.validateUserUpdate(user.email);
    if(existEmail !== null && existEmail.id === id){
      update = await this.usersRepository.update(id, user);
      response = {
        data: update,
        statusCode: 200,
        message: "Updated successfully!",
        error: false
      };
    } else {
      response = {
        data: null,
        statusCode: 400,
        message: "El correo electrónico ya existe!",
        error: true
      };
    }

    if(update === null) {
      response = {
        data: null,
        statusCode: 400,
        message: "No se pudo actualizar los datos!",
        error: true
      };
    }
    return response;

  }

  async findAll() {
    let response: { data; statusCode; message } = {
      data: await this.usersRepository.findAll(),
      statusCode: 200,
      message: "Get All successfullyx!"
    };
    return response;
  }

  async delete(id: string) {
    const that = this;
    let response: { data; statusCode; message, error };
    let exist = null;
    exist = await this.usersRepository.validateUserById(id);

    if(exist) {
      response = {
        data: await this.usersRepository.delete(id),
        statusCode: 200,
        message: "Deleted successfully!",
        error: false
      };
      return response;
    } else {
      response = {
        data: null,
        statusCode: 404,
        message: "No se pudo eliminar el usuario!",
        error: true
      };
      return response;
    }

  }

  async readByEmail(username: string){
    return await this.usersRepository.getUserByUserName(username)
  }
}

