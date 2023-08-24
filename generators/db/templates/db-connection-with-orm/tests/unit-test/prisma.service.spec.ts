import {Test , TestingModule } from '@nestjs/testing'
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';


describe('PrismaService' () => {
    let prismaService: PrismaService ;

    beforeEach(async ()=>{
        const module : TestingModule = Test.createTestingModule({
            providers : [
                PrismaService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(() => '<%=DB_URL%>'),
                    },
                },
            ]
        }).compile();
        prismaService = module.get<PrismaService>(PrismaService);
    })

    it('should be defined', () => {
        expect(prismaService).toBeDefined();
    });
})