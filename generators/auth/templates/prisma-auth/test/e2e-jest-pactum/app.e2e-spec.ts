import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { SignUpDto , SignInDto } from "../src/auth/dto";
import { PrismaService } from '../src/prisma/prisma.service';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
        await Test.createTestingModule({
          imports: [AppModule],
        }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
        }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl(
        'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const signUpdto: SignUpDto = {
      username: 'test@gmail.com',
      password: '123',
      roles : ["ADMIN" , "USER"]
    };
    const signIndto: SignInDto = {
      username: 'test@gmail.com',
      password: '123',
      roles : ["USER"]
    };
    describe('Signup', () => {
      it('should throw if username empty', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              password: signUpdto.password,
            })
            .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              username: signUpdto.username,
            })
            .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody(signUpdto)
            .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              password: signIndto.password,
            })
            .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              username: signIndto.username,
            })
            .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody(signIndto)
            .expectStatus(200)
            .stores('userAt', 'access_token');
      });
    });
  });
});