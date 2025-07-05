import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 15 }] }),
        HealthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
