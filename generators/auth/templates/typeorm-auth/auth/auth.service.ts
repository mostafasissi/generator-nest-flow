import {ForbiddenException, Injectable} from "@nestjs/common";
import { SignInDto, SignUpDto} from "./dto";
import * as argon from 'argon2'
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Role} from "@prisma/client";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';

@Injectable()
export class AuthService{
    constructor(
        private jwt : JwtService ,
        private config : ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    async signup(dto : SignUpDto ) {
        // generate the hash password
        dto.hash = await argon.hash(dto.hash);

        const user = await
            this.userRepository.save({
            data : dto
            })
        // return the jwt token
        return  this.signToken(user.id , user.username , user.roles) ;
    }

    async signin(dto : SignInDto){
        // find user by email
        const user = await this.userRepository.findOne({
            where: { username : dto.username },
        });

        // throw exception if not found
        if(!user){
            throw new ForbiddenException("Credentials incorrect !!!")
        }
        if(user.isActive != true ){
            throw new ForbiddenException("Account Disabled !!! ")
        }
        // cheek the password
        const pwMatcher =await argon.verify(user.password , dto.password);
        // throw exception if not found
        if(!pwMatcher){
            throw new ForbiddenException("Credentials incorrect !!!")
        }
        // return the jwt token
        return this.signToken(user.id , user.username , user.roles) ;
    }

    async signToken(userId : string , username : string , roles : Role[] )  {
        const payload = {
            sub : userId ,
            username ,
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