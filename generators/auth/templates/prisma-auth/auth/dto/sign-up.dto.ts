import {IsArray, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    login : string ;

    @IsString()
    @IsNotEmpty()
    hash : string ; // in the first time hash = password , after it will be hashed

    @IsNotEmpty()
    @IsArray()
    roles : Role[] ;

}