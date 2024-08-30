import { Test, TestingModule } from '@nestjs/testing';
import { DemonReelService } from './demon-reel.service';

describe('DemonReelService', () => {
  let service: DemonReelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemonReelService],
    }).compile();

    service = module.get<DemonReelService>(DemonReelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
