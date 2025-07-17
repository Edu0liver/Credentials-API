// src/email/email.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@ApiTags('Email')
@Controller('email')
export class MailerController {
    constructor(private readonly mailerService: MailerService) {}

    @Post('send')
    @ApiOperation({ summary: 'Enviar e-mail genérico' })
    async sendEmail(@Body() dto: SendEmailDto) {
        return await this.mailerService.sendGeneric(
            dto.to,
            dto.subject,
            dto.html,
        );
    }
}
