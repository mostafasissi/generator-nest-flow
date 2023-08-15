import {IsArray, IsEmail, IsNotEmpty, IsString} from "class-validator";
import {Role} from '../enums/role.enums';

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    username : string ;

    @IsString()
    @IsNotEmpty()
    password : string ; // in the first time hash = password , after it will be hashed

    @IsNotEmpty()
    @IsArray()
    roles : Role[] ;

}