import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    username : string ;

    @IsString()
    @IsNotEmpty()
    password : string
}