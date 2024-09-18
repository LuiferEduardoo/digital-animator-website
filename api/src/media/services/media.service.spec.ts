import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import * as sharp from 'sharp';
import * as fs from 'fs-extra';
import * as ffmpeg from 'fluent-ffmpeg';
import { ProcessedFileData } from '../dto/ProcessedFileData.dto';

jest.mock('sharp', () => {
  return jest.fn(() => ({
    webp: jest.fn().mockReturnThis(),
    toFile: jest.fn().mockResolvedValue({}),
    metadata: jest.fn().mockResolvedValue({
      width: 800,
      height: 600,
    }),
  }));
});

jest.mock('fs-extra', () => ({
  stat: jest.fn().mockResolvedValue({ size: 12345 }),
  writeFile: jest.fn().mockResolvedValue({}),
  remove: jest.fn().mockResolvedValue({}),
}));

jest.mock('fluent-ffmpeg', () => {
  const mockFfmpeg = jest.fn(() => ({
    inputFormat: jest.fn().mockReturnThis(),
    outputOptions: jest.fn().mockReturnThis(),
    output: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation(function (event, callback) {
      if (event === 'end') {
        callback(); // Simula la finalización del proceso.
      } else if (event === 'error') {
        callback(new Error('ffmpeg error')); // Simula un error.
      }
      return this;
    }),
    run: jest.fn(),
  }));

  // Crea una función que retorna una nueva instancia de ffmpeg mockeado
  return mockFfmpeg;
});

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  describe('processImage', () => {
    it('should process the image and return metadata', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from(''),
      } as Express.Multer.File;

      const result = await service.processImage(mockFile);

      expect(result).toEqual(expect.objectContaining({
        folder: 'uploads/image',
        format: 'webp',
        file_size: '12345',
        width: 800,
        height: 600,
      }));
    
      expect(result.name).toMatch(/^test-.*\.webp$/);
      expect(result.url).toMatch(/^uploads\/image\/test-.*\.webp$/);
    });
  });

  describe('processGif', () => {
    it('should process the gif and return metadata', async () => {
      const mockFile = {
        originalname: 'test.gif',
        buffer: Buffer.from(''),
      } as Express.Multer.File;
    
      const mockMetadata = {
        streams: [
          { width: 500, height: 400, nb_frames: 10, avg_frame_rate: '30/1' }
        ]
      };
      jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
      jest.spyOn(fs, 'stat').mockResolvedValue({ size: 12345 } as any);
      jest.spyOn(fs, 'remove').mockResolvedValue(undefined);
      jest.spyOn(service as any, 'getFfprobeData').mockResolvedValue(mockMetadata);
    
      const ffmpegMock = {
        inputFormat: jest.fn().mockReturnThis(),
        outputOptions: jest.fn().mockReturnThis(),
        output: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation(function (event, callback) {
          if (event === 'end') {
            callback(); // Simula la finalización exitosa del proceso.
          }
          return this;
        }),
        run: jest.fn(),
      };
    
      (ffmpeg as any).mockReturnValue(ffmpegMock);
    
      const result = await service.processGif(mockFile);
    
      expect(result).toEqual(expect.objectContaining({
        folder: 'uploads/animation',
        format: 'webp',
        file_size: 12345,
        width: 500,
        height: 400,
        number_frames: 10,
        duration_each_frame: '30/1',
      }));
    });    
  });

  describe('processVideo', () => {
    it('should process the video and return metadata', async () => {
      const mockFile = {
        originalname: 'test.mp4',
        buffer: Buffer.from(''),
      } as Express.Multer.File;
    
      const mockMetadata = {
        format: {
          duration: 60,
          size: 78901,
        },
        streams: [
          { width: 1280, height: 720 }
        ]
      };
    
      jest.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
      jest.spyOn(fs, 'stat').mockResolvedValue({ size: 12345 } as any);  // Simulamos el tamaño de archivo correcto
      jest.spyOn(fs, 'remove').mockResolvedValue(undefined);
      jest.spyOn(service as any, 'getFfprobeData').mockResolvedValue(mockMetadata);
    
      const ffmpegMock = {
        inputFormat: jest.fn().mockReturnThis(),
        outputOptions: jest.fn().mockReturnThis(),
        output: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation(function (event, callback) {
          if (event === 'end') {
            callback(); // Simula la finalización exitosa del proceso.
          }
          return this;
        }),
        run: jest.fn(),
      };
    
      (ffmpeg as any).mockReturnValue(ffmpegMock);
    
      const result = await service.processVideo(mockFile);
    
      expect(result).toEqual(expect.objectContaining({
        folder: 'uploads/video',
        format: 'mp4',
        file_size: 12345, // Asegúrate de que aquí se use el valor correcto del mock.
        resolution: '1280x720',
        duration: 60,
      }));
    
      // Validamos dinámicamente el UUID generado para el nombre y la URL
      expect(result.name).toMatch(/test-.*\.mp4/);
      expect(result.url).toMatch(/uploads\/video\/test-.*\.mp4/);
    });    
  });

  describe('deleteFile', () => {
    it('should delete the file', async () => {
      await expect(
        service.deleteFile('uploads/test-file.webp'),
      ).resolves.not.toThrow();
      expect(fs.remove).toHaveBeenCalledWith('uploads/test-file.webp');
    });
  });
});