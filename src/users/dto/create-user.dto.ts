import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ example: 'João Silva' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
