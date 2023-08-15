import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {ExtractJwt} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthStrategy extends PassportStrategy(
    Strategy, 'jwt'
){
    constructor(
        config : ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({
           jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('SECRET_KEY')
        });
    }
    async validate(payload : {sub : string ; username : string}){
        const  user =
            await this.userRepository.findOne({
                where: {
                    id  : payload.sub
                },
            });
        delete user.password ;
        return user ;
    }
}