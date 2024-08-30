import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { DemonReelController } from './controllers/demon-reel.controller';
import { ProjectsController } from './controllers/projects.controller';
import { MediaController } from './controllers/media.controller';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { EmailService } from './services/email.service';
import { MediaService } from './services/media.service';
import { ProjectsService } from './services/projects.service';
import { AuthService } from './services/auth.service';
import { DemonReelService } from './services/demon-reel.service';
import { DemonReelModule } from './modules/demon-reel.module';

@Module({
  controllers: [AppController, AuthController, DemonReelController, ProjectsController, MediaController, ContactController],
  providers: [AppService, ContactService, EmailService, MediaService, ProjectsService, AuthService, DemonReelService],
  imports: [DemonReelModule],
})
export class AppModule {}
