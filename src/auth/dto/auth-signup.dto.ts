import { IsNotEmpty, IsBoolean } from 'class-validator';

export class AuthSignUpDto {

    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    email: string;
  
    @IsBoolean()
    acceptTerms: boolean;

}
