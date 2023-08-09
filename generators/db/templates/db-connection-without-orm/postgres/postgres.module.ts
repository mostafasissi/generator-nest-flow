import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresService } from './postgres.service';

@Global() // Mark the module as global so that it can be used across the entire application
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })], // Make sure to import ConfigModule here
    providers: [
        {
            provide: 'POSTGRES_CONNECTION',
            useFactory: (configService: ConfigService) => {
                return new Pool({
                    user: configService.get('DB_USER'),
                    host: configService.get('DB_HOST'),
                    database: configService.get('DB_NAME'),
                    password: configService.get('DB_PASSWORD'),
                    port: configService.get('DB_PORT'),
                });
            },
            inject: [ConfigService],
            destroyOnUnmount: true,
        },
    ],
    exports: ['POSTGRES_CONNECTION' , PostgresService], // Export the token for other modules to use
})
export class PostgresModule {}
