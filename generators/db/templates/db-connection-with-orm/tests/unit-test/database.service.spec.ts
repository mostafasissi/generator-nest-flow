import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseProviders } from './database.providers';
import { ConfigService } from '@nestjs/config';

describe('DatabaseProviders', () => {
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabaseProviders,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(), // Mock the config service methods as needed
                    },
                },
            ],
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(DatabaseProviders).toBeDefined();
    });

    it('should create a DataSource with the expected configuration', async () => {
        configService.get = jest.fn().mockReturnValueOnce('<%=payload.answers.databaseType%>'); // Replace with your database type
        configService.get = jest.fn().mockReturnValueOnce('<%=payload.answers.databaseHost%>'); // Replace with your host
        configService.get = jest.fn().mockReturnValueOnce(<%=payload.answers.databasePort%>); // Replace with your port
        configService.get = jest.fn().mockReturnValueOnce('<%=payload.answers.databaseName%>'); // Replace with your username
        configService.get = jest.fn().mockReturnValueOnce('<%=payload.answers.databasePassword%>'); // Replace with your password
        configService.get = jest.fn().mockReturnValueOnce('<%=payload.answers.databaseName%>'); // Replace with your database name

        const dataSource = await DatabaseProviders.useFactory(configService);

        expect(dataSource).toBeInstanceOf(DataSource);
        // Add more assertions as needed to validate the DataSource configuration.
    });
});
