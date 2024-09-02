import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DemonReelModule } from './demon-reel/demon-reel.module';
import { ProjectsModule } from './projects/projects.module';
import { MediaModule } from './media/media.module';
import { ContactModule } from './contact/contact.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [config],
      isGlobal: true,
    }),
    AuthModule, 
    DemonReelModule, 
    ProjectsModule, 
    MediaModule, 
    ContactModule, 
    EmailModule, 
    UsersModule
  ],
})
export class AppModule {}
