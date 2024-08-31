import { Module } from '@nestjs/common';
import { DemonReelService } from './services/demon-reel.service';
import { DemonReelController } from './controllers/demon-reel.controller';

@Module({
  providers: [DemonReelService],
  controllers: [DemonReelController]
})
export class DemonReelModule {}
