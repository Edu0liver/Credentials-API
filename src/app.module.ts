import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 15 }] }),
        HealthModule,
        SharedModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
