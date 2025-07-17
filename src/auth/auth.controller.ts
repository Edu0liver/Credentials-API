import {
    Controller,
    Post,
    UseGuards,
    Req,
    Get,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
    getProfile(@Req() req: Request) {
        return req.user;
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Solicitar reset de senha' })
    @ApiResponse({
        status: 200,
        description: 'E-mail de reset enviado com sucesso.',
    })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email);
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Resetar a senha com token' })
    @ApiResponse({ status: 200, description: 'Senha resetada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Token inválido ou expirado.' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto.token, dto.password);
    }
}
