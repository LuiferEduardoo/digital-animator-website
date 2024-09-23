import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Authentication } from '../entities/authentications.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authentication)
    private authenticationRepo: Repository<Authentication>,
    private jwtService: JwtService,
    private configService: ConfigService 
  ) {}

  async getUserForCredential(credential: string){
    try {
      let where: { email?: string; username?: string } = {};
      if (credential.includes('@')) {
        where.email = credential;
      } else {
        where.username = credential;
      }
      const user = await this.authenticationRepo.findOne({
        where,
        relations: ['user', 'user.rolUser', 'user.rolUser.rol'],
      });
      return user;
    } catch(err){
      throw err
    }
  }

  async validateUser(credential: string, password: string) {
    try {
      const user = await this.getUserForCredential(credential);
      if(!user.active){
        throw new UnauthorizedException('Inactive user');
      }
      const isPasswordValid  = await bcrypt.compare(password, user.password);
      if(user && isPasswordValid ){
        return user;
      } else {
        throw new Error()
      }
    } catch(err){
      throw new UnauthorizedException('Incorrect password or email');
    }
  }

  async login(userAuh: Authentication) {
    const payload: PayloadToken = {
      sub: userAuh.user.id,
      role: userAuh.user.rolUser.rol.rol
    }

    return {
      message: "Successful login",
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('config.jwtSecret.access'),
        expiresIn: '7d',
      })
    }
  }
}
