import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Authentication } from '../entities/authentications.entity';
import { PayloadToken, PayloadTokenReset } from '../models/token.model';
import { ResetPassword } from '../dto/resetPassword.dto';
import { EmailService } from 'src/email/services/email.service';
import { ChangePassword } from '../dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authentication)
    private authenticationRepo: Repository<Authentication>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async getUserForCredential(credential: string) {
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
    } catch (err) {
      throw err;
    }
  }

  async validateUser(credential: string, password: string) {
    try {
      const user = await this.getUserForCredential(credential);
      if (!user.active) {
        throw new UnauthorizedException('Inactive user');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (user && isPasswordValid) {
        return user;
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedException('Incorrect password or email');
    }
  }

  async login(userAuh: Authentication) {
    const payload: PayloadToken = {
      sub: userAuh.user.id,
      role: userAuh.user.rolUser.rol.rol,
    };

    return {
      message: 'Successful login',
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('config.jwtSecret.access'),
        expiresIn: '7d',
      }),
    };
  }

  async resetPassword(resetPassword: ResetPassword) {
    try {
      const user = await this.authenticationRepo.findOne({
        where: {
          email: resetPassword.email,
          active: true,
        },
        relations: ['user'],
      });

      if (user) {
        const payload: PayloadTokenReset = {
          sub: user.user.id,
        };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get<string>('config.jwtSecret.reset'),
          expiresIn: '25m',
        });

        const url = `${this.configService.get<string>('config.urlDashboard')}/auth/change-password?token=${token}`;
        const html = `<p>Recupera tu contraseña con el siguiente link: <a href="${url}">Recuperar Contraseña</a></p>`;
        await this.emailService.sendMail(
          user.email,
          'Recuperación de contraseña',
          html,
        );
        user.password_reset_token = token;
        await this.authenticationRepo.save(user);
      }
      return {
        message: 'Email sent successfully',
      };
    } catch (err) {
      throw err;
    }
  }

  async changePassword(payload: PayloadTokenReset, token: string, changePassword: ChangePassword) {
    try {
      if (changePassword.newPassword !== changePassword.repeatPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      const user = await this.authenticationRepo.findOne({
        where: {
          user: {
            id: payload.sub,
          },
          active: true,
        },
        relations: ['user'],
      });
      if (!user) {
        throw new NotFoundException('User not found or inactive');
      }
      if(user.password_reset_token !== token){
        throw new UnauthorizedException('Invalid token');
      }
      user.password_reset_token = null;
      user.password = changePassword.newPassword;
      await this.authenticationRepo.save(user);

      return {
        message: 'password changed successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}