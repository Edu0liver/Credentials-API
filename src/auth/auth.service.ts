import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { MailerService } from 'src/mailer/mailer.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Usuário ou senha inválidos');
        }

        const { password: _, ...result } = user;

        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };

        return { access_token: this.jwtService.sign(payload) };
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) return;

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

        await this.usersService.update(user.id, {
            reset_token: token,
            reset_token_expires: expiresAt,
        });

        await this.mailerService.sendPasswordReset(email, token);
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await this.usersService.findByResetToken(token);

        if (!user) {
            throw new BadRequestException('Token inválido ou expirado');
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await this.usersService.update(user.id, {
            password: hash,
            reset_token: undefined,
            reset_token_expires: undefined,
        });
    }
}
