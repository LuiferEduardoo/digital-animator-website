import { Test, TestingModule } from '@nestjs/testing';
import { DemonReelController } from './demon-reel.controller';

describe('DemonReelController', () => {
  let controller: DemonReelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemonReelController],
    }).compile();

    controller = module.get<DemonReelController>(DemonReelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
