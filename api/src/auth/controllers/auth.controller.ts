import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(){}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() @Req() req: Request){
    return "successful login"
  }
}
