import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    login : string ;

    @IsString()
    @IsNotEmpty()
    password : string
}