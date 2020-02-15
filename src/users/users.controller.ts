import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserGetDto } from "./dto/user-read.dto";
import { Response } from 'express';
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @HttpCode(200)
  async create(@Body() user: UserCreateDto) {
      const result =  await this.usersService.create(user);
      if(result.error === true){
        throw new HttpException(result.message, result.statusCode);
      }
      return result;
  }
  
  @Get(":id")
  @HttpCode(200)
  async read(@Param() params: any, @Res() res: Response) {
    const result = await this.usersService.read(params.id);
    if(result.error === true){
      throw new HttpException(result.message, result.statusCode);
    }
    return result;
  }

  @Put(":id")
  @HttpCode(200)
  async update(@Param("id") id: string, @Body() request: any) {
    const result = await this.usersService.update(id, request);
    if(result.error === true){
      throw new HttpException(result.message, result.statusCode);
    }
    return result;
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.usersService.delete(id);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

}
