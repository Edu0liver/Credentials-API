import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'João Atualizado' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'joao@email.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ example: 'novasenha456' })
    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    reset_token?: string;

    @IsOptional()
    reset_token_expires?: Date;
}
