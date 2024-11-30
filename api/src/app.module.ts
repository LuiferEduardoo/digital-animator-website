import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DemonReelModule } from './demon-reel/demon-reel.module';
import { ProjectsModule } from './projects/projects.module';
import { MediaModule } from './media/media.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AboutModule } from './about/about.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AuthModule, 
    DemonReelModule, 
    ProjectsModule, 
    MediaModule, 
    EmailModule, 
    UsersModule, 
    AboutModule,
    DatabaseModule
  ],
})
export class AppModule {}