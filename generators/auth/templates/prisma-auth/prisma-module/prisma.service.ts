import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private config : ConfigService) {
        // @ts-ignore
        super({
            datasources : {
                db : {
                    url: config.get('DATABASE_URL'),
                }
            }
        });
    }
}
