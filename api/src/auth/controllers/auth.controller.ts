import {
  Controller,
  Post,
  Req,
  Body,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { Authentication } from '../entities/authentications.entity';
import { AuthService } from '../services/auth.service';
import { ResetPassword } from '../dto/resetPassword.dto';
import { PayloadTokenReset } from '../models/token.model';
import { ChangePassword } from '../dto/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const authentication = req.user as Authentication;
    return this.authService.login(authentication);
  }

  @Post('/recovery')
  recovery(@Body() resetPassword: ResetPassword ) {
    return this.authService.resetPassword(resetPassword);
  }

  @UseGuards(AuthGuard('reset-token'))
  @Post('/change-password')
  changePassword(@Body() changePassword: ChangePassword, @Req() req: Request ) {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del header
    const userPayload = req.user as PayloadTokenReset;
    return this.authService.changePassword(userPayload, token, changePassword);
  }
}