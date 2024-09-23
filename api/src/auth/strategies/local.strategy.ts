import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'credential', passwordField: 'password' });
  }

  async validate(credential: string, password: string) {
    try {
      const user = await this.authService.validateUser(credential, password);
      return user;
    } catch(err){
      throw err
    }
  }
}
