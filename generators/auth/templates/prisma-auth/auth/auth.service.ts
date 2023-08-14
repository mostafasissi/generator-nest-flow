import {ForbiddenException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import { SignInDto, SignUpDto} from "./dto";
import * as argon from 'argon2'
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Role} from "@prisma/client";
@Injectable()
export class AuthService{
    constructor(
        private prisma : PrismaService ,
        private jwt : JwtService ,
        private config : ConfigService
    ) {
    }

    async signup(dto : SignUpDto ) {
        // generate the hash password
        dto.hash = await argon.hash(dto.hash);

        const user = await this.prisma.user.create({
            data : dto
        })
        // return the jwt token
        return  this.signToken(user.id , user.login , user.roles) ;
    }

    async signin(dto : SignInDto){
        // find user by email
        const user =await this.prisma.user.findFirst({
            where : {
                login : dto.login ,
            }
        });
        // throw exception if not found
        if(!user){
            throw new ForbiddenException("Credentials incorrect !!!")
        }
        if(user.isActive != true ){
            throw new ForbiddenException("Account Disabled !!! ")
        }
        // cheek the password
        const pwMatcher =await argon.verify(user.hash , dto.password);
        // throw exception if not found
        if(!pwMatcher){
            throw new ForbiddenException("Credentials incorrect !!!")
        }
        // return the jwt token
        return this.signToken(user.id , user.login , user.roles) ;
    }

    async signToken(userId : number , login : string , roles : Role[] )  {
        const payload = {
            sub : userId ,
            login ,
            roles : roles
        };

        const secret_key = this.config.get('SECRET_KEY');
        const expired_at = this.config.get('EXPIRES_IN');


        const token = await this.jwt.signAsync(
            payload ,
            {
                expiresIn : expired_at ,
                secret : secret_key
            }
        )
        return {
            access_token : token ,
        }
    }

}