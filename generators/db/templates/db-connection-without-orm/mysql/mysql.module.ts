import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createConnection } from 'mysql2/promise';
import { MysqlService } from './mysql.service';

@Module({
    imports: [ConfigModule], // Importez ConfigModule ici aussi
    providers: [
        {
            provide: 'MYSQL_CONNECTION',
            useFactory: async (configService: ConfigService) => {
                const connection = await createConnection({
                    host: configService.get<string>('DB_HOST'),
                    port:  configService.get<string>('DB_PORT'),
                    user: configService.get<string>('DB_USER'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_NAME'),
                });
                return connection;
            },
            inject: [ConfigService], // Injectez ConfigService pour accéder aux variables d'environnement
            destroyOnUnmount: true,
        },
        MysqlService,
    ],
    exports: ['MYSQL_CONNECTION', MysqlService],
})
export class MysqlModule {}
