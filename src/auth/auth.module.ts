import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        UsersModule,
    ],
    providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
