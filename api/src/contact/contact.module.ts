import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { EmailService } from './services/email.service';
import { ContactController } from './controllers/contact.controller';

@Module({
  providers: [ContactService, EmailService],
  controllers: [ContactController]
})
export class ContactModule {}
