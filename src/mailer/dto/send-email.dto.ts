// src/email/dto/send-email.dto.ts
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
    @ApiProperty({ example: 'destinatario@email.com' })
    @IsEmail()
    to: string;

    @ApiProperty({ example: 'Assunto do e-mail' })
    @IsString()
    subject: string;

    @ApiProperty({ example: '<h1>Olá, mundo!</h1>' })
    @IsString()
    html: string;
}
