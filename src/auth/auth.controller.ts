import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login do usuário' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'joao@email.com' },
                password: { type: 'string', example: 'senha123' },
            },
            required: ['email', 'password'],
        },
    })
    @ApiResponse({
        status: 201,
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string', example: 'eyJhbGciOiJI...' },
            },
        },
    })
    async login(@Req() req: Request) {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Retorna as informações do usuário autenticado' })
    @ApiResponse({
        status: 200,
        description: 'Informações do usuário retornadas com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                email: { type: 'string', example: 'joao@email.com' },
            },
        },
    })
    getProfile(@Req() req) {
        return req.user;
    }
}
