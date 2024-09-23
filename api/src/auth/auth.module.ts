import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { Authentication } from './entities/authentications.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Authentication]),

    // Módulo para el access token
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '7d' },
    }),

    // Módulo para el reset token
    JwtModule.register({
      secret: process.env.RESET_TOKEN_SECRET,
      signOptions: { expiresIn: '25m' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
