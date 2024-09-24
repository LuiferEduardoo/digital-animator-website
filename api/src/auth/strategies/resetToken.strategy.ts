import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { PayloadTokenReset } from '../models/token.model';
import { ConfigType } from '@nestjs/config';

import config from '../../config';

@Injectable()
export class ResetTokenStrategy extends PassportStrategy(
  Strategy,
  'reset-token',
) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret.reset,
    });
  }

  async validate(payload: PayloadTokenReset) {
    return {payload};
  }
}