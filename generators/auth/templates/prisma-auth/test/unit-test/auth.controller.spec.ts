import {Test , TestingModule} from '@nestjs/testing';
import  {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {SignUpDto , SignInDto} from './dto' ;
import { Role } from '@prisma/client';
describe('Authentication controller ' , () => {
    let authController : AuthController ;
    let authService : AuthService ;
    beforeEach(async ()=>{
        const module : TestingModule = Test.createTestingModule({
            controllers : [AuthController] ,
            providers : [AuthService] ,
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    })

    it('should be defined ' , ()=>{
        expect(authController).toBeDefined();
    })

    describe('SignUp' , ()=>{
        let signUpDto : SignUpDto = {
            login: 'test@example.com',
            hash: 'password123',
            roles: [Role.USER, Role.ADMIN],
        }
        const signupSpy = jest.spyOn(authService, 'signup');
        authController.signup(signUpDto);
        expect(signupSpy).toHaveBeenCalledWith(signUpDto);
    })
    describe('signin', () => {
        it('should call authService.signin with the provided DTO', () => {
            const signInDto: SignInDto = {
                login: 'test@example.com',
                password: 'password123',
            };
            const signinSpy = jest.spyOn(authService, 'signin');
            authController.signin(signInDto);
            expect(signinSpy).toHaveBeenCalledWith(signInDto);
        });
    });

})