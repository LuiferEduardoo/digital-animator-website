import { Module } from '@nestjs/common';
import { AboutService } from './services/about.service';

@Module({
  providers: [AboutService]
})
export class AboutModule {}