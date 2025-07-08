import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);

        const passwordValid = await compare(password, user.password);
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
}
