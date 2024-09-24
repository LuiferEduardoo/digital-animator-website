import {
  Controller,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { Authentication } from '../entities/authentications.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const authentication = req.user as Authentication;
    return this.authService.login(authentication);
  }
}