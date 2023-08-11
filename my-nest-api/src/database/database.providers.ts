import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseProviders = {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
            type: "postgresql",
            host: configService.get('DB_HOST'), // Use config values
            port: configService.get<number>('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        });
        return dataSource.initialize();
    },
    inject: [ConfigService], // Inject ConfigService
};
