import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { SignUpDto, SignInDto } from './dto';
import { Role } from '@prisma/client';

describe('AuthService', () => {
    let authService: AuthService;
    let prismaService: PrismaService;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                PrismaService,
                JwtService,
                ConfigService,
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        prismaService = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('signup', () => {
        it('should create a user and return a token', async () => {
            const signUpDto: SignUpDto = {
                login: 'test@example.com',
                hash: 'password123',
                roles: [Role.USER],
            };

            const createUserMock = jest.spyOn(prismaService.user, 'create').mockResolvedValue({
                id: 1,
                login: signUpDto.login,
                roles: signUpDto.roles,
            });

            const signTokenMock = jest.spyOn(authService, 'signToken').mockReturnValue({
                access_token: 'mocked_token',
            });

            const result = await authService.signup(signUpDto);

            expect(createUserMock).toHaveBeenCalledWith({ data: signUpDto });
            expect(signTokenMock).toHaveBeenCalledWith(1, signUpDto.login, signUpDto.roles);
            expect(result).toEqual({ access_token: 'mocked_token' });
        });

        it('should hash the password', async () => {
            const signUpDto: SignUpDto = {
                login: 'test@example.com',
                hash: 'password123',
                roles: [Role.USER],
            };

            const hashedPassword = 'hashed_password';

            const argonHashMock = jest.spyOn(argon, 'hash').mockResolvedValue(hashedPassword);

            const createUserMock = jest.spyOn(prismaService.user, 'create').mockResolvedValue({
                id: 1,
                login: signUpDto.login,
                roles: signUpDto.roles,
            });

            await authService.signup(signUpDto);

            expect(argonHashMock).toHaveBeenCalledWith(signUpDto.hash);
            expect(createUserMock).toHaveBeenCalledWith({ data: { ...signUpDto, hash: hashedPassword } });
        });

    });

    describe('signin', () => {
        it('should sign in a user and return a token', async () => {
            const signInDto: SignInDto = {
                login: 'test@example.com',
                password: 'password123',
            };

            const user = {
                id: 1,
                login: signInDto.login,
                roles: [Role.USER],
                hash: 'hashed_password', // Pre-hashed password for testing
                isActive: true,
            };

            const findFirstMock = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

            const argonVerifyMock = jest.spyOn(argon, 'verify').mockResolvedValue(true);

            const signTokenMock = jest.spyOn(authService, 'signToken').mockReturnValue({
                access_token: 'mocked_token',
            });

            const result = await authService.signin(signInDto);

            expect(findFirstMock).toHaveBeenCalledWith({ where: { login: signInDto.login } });
            expect(argonVerifyMock).toHaveBeenCalledWith(user.hash, signInDto.password);
            expect(signTokenMock).toHaveBeenCalledWith(user.id, user.login, user.roles);
            expect(result).toEqual({ access_token: 'mocked_token' });
        });

        it('should throw ForbiddenException if user is not found', async () => {
            const signInDto: SignInDto = {
                login: 'nonexistent@example.com',
                password: 'password123',
            };

            const findFirstMock = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

            await expect(authService.signin(signInDto)).rejects.toThrow(ForbiddenException);

            expect(findFirstMock).toHaveBeenCalledWith({ where: { login: signInDto.login } });
        });

        it('should throw ForbiddenException if user is not active', async () => {
            const signInDto: SignInDto = {
                login: 'test@example.com',
                password: 'password123',
            };

            const user = {
                id: 1,
                login: signInDto.login,
                roles: [Role.USER],
                hash: 'hashed_password', // Pre-hashed password for testing
                isActive: false, // User is not active
            };

            const findFirstMock = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

            await expect(authService.signin(signInDto)).rejects.toThrow(ForbiddenException);

            expect(findFirstMock).toHaveBeenCalledWith({ where: { login: signInDto.login } });
        });

        it('should throw ForbiddenException if password is incorrect', async () => {
            const signInDto: SignInDto = {
                login: 'test@example.com',
                password: 'incorrect_password', // Incorrect password
            };

            const user = {
                id: 1,
                login: signInDto.login,
                roles: [Role.USER],
                hash: 'hashed_password',
                isActive: true,
            };

            const findFirstMock = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

            const argonVerifyMock = jest.spyOn(argon, 'verify').mockResolvedValue(false); // Incorrect password verification

            await expect(authService.signin(signInDto)).rejects.toThrow(ForbiddenException);

            expect(findFirstMock).toHaveBeenCalledWith({ where: { login: signInDto.login } });
            expect(argonVerifyMock).toHaveBeenCalledWith(user.hash, signInDto.password);
        });

    });

    describe('signToken', () => {
        it('should sign a token with the provided data', async () => {
            const userId = 1;
            const login = 'test@example.com';
            const roles: Role[] = [Role.USER];

            const signAsyncMock = jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mocked_token');

            const result = await authService.signToken(userId, login, roles);

            expect(signAsyncMock).toHaveBeenCalledWith(
                { sub: userId, login, roles },
                { expiresIn: 'mocked_expired_at', secret: 'mocked_secret_key' } // Mocked values from ConfigService
            );
            expect(result).toEqual({ access_token: 'mocked_token' });
        });

    });
});
