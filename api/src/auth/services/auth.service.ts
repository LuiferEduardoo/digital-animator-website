import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

import { Authentication } from '../entities/authentications.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authentication)
    private authenticationRepo: Repository<Authentication>,
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
}
