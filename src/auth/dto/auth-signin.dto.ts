import { IsNotEmpty } from 'class-validator';

export class AuthSignInDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}
