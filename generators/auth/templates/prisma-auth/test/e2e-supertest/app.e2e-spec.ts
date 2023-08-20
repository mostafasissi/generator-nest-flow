import {Test , TestingModule} from  '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {INestApplication , ValidationPipe} from 'nestjs/common';
import * as request from 'supertest';
import {PrismaService} from "../src/prisma/prisma.service";
import { SignUpDto , SignInDto } from "../src/auth/dto";

describe('App e2e' , ()=>{
  let app : INestApplication ;
  let prisma : PrismaService;

  beforeAll(async ()=>{
    const moduleFixture : TestingModule = await Test.createTestingModule({
      import : [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
        }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
  })
  afterAll(()=>{
    app.close();
  })

  describe('Auth' , ()=> {
    const signupdto: SignUpDto = {
      username: 'test@gmail.com',
      password: '123',
      roles : ["ADMIN" , "USER"]
    };
    const signindto: SignInDto = {
      username: 'test@gmail.com',
      password: '123',
      roles : ["USER"]
    };

    describe('Signup' , ()=>{
      it('should throw if username empty' , () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({password : signupdto.password})
            .expect(400);
      })

      it('should throw if password empty' , () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({username : signupdto.username })
            .expect(400)
      })
      it('should throw if no body provided' , () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .expect(400)
      })
      it('should signup' , ()=>{
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(signupdto)
            .expect(201)
      })
    })
    describe('Signin' , ()=>{
      it('should throw if username empty' , () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send({password : signindto.password})
            .expect(400);
      })

      it('should throw if password empty' , () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send({username : signindto.username })
            .expect(400)
      })
      it('should throw if no body provided' , () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .expect(400)
      })
      it('should signin' , ()=>{
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send(signindto)
            .expect(201)
      })
    })
  })
})