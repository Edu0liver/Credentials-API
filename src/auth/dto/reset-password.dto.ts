import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: 'novoTokenGerado123' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'novaSenha123' })
    @IsString()
    @MinLength(6)
    password: string;
}
