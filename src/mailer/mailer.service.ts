import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async sendPasswordReset(email: string, token: string) {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await this.transporter.sendMail({
            from: '"Sistema" <no-reply@seusistema.com>',
            to: email,
            subject: 'Recuperação de senha',
            html: `Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a>`,
        });
    }

    async sendGeneric(to: string, subject: string, html: string) {
        const info = await this.transporter.sendMail({
            from: `"Suporte" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        return { messageId: info.messageId };
    }
}
