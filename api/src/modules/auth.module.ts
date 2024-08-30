import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects.module';
import { MediaModule } from './media.module';
import { ContactModule } from './contact.module';

@Module({
  imports: [ProjectsModule, MediaModule, ContactModule]
})
export class AuthModule {}
