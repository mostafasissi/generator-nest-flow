import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {ExtractJwt} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(
    Strategy, 'jwt'
){
    constructor(
        config : ConfigService,
        private prisma : PrismaService
    ) {
        super({
           jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('SECRET_KEY')
        });
    }
    async validate(payload : {sub : number ; login : string}){
        const  user =
            await  this.prisma.user.findUnique({
            where : {
                id  : payload.sub
            }
        })
        delete user.hash ;
        return user ;
    }
}