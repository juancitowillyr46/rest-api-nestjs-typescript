import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserCreateDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsBoolean()
  acceptTerms: boolean;
}
