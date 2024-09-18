import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { ProcessedFileData } from '../dto/ProcessedFileData.dto';

@Injectable()
export class MediaService {
  private createFolder(folderPath: string) {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }
  }

  private generateFileName(originalName: string, ext: string): string {
    const fileExt = originalName.split('.').pop(); // Extensión del archivo
    const fileNameWithoutExt = originalName.replace(`.${fileExt}`, ''); // Nombre sin extensión
    const uniqueSuffix = `${uuidv4()}`; // UUID para garantizar unicidad
    return `${fileNameWithoutExt}-${uniqueSuffix}.${ext}`;
  }

  private getFfprobeData(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata);
        }
      });
    });
  }

  async processImage(file: Express.Multer.File): Promise<ProcessedFileData> {
    try {
      const outputDir = join(process.cwd(), 'uploads/image');
      this.createFolder(outputDir);
      const outputFileName = this.generateFileName(file.originalname, 'webp');
      const outputPath = join(outputDir, outputFileName);

      // Procesa la imagen y obtiene los metadatos
      const image = await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Obtener metadatos de la imagen
      const metadata = await sharp(outputPath).metadata();
      const { size } = await fs.stat(outputPath);

      return {
        name: outputFileName,
        url: `uploads/image/${outputFileName}`,
        folder: `uploads/image`,
        format: 'webp',
        file_size: String(size),
        width: metadata.width,
        height: metadata.height,
      };
    } catch (err) {
      throw err;
    }
  }

  async processGif(file: Express.Multer.File): Promise<ProcessedFileData> {
    try {
      const outputDir = join(process.cwd(), 'uploads/animation');
      this.createFolder(outputDir);

      const outputFileName = this.generateFileName(file.originalname, 'webp');
      const tempFilePath = join(outputDir, `${Date.now()}-temp.gif`);
      const outputPath = join(outputDir, outputFileName);

      // Guarda el archivo GIF temporalmente
      await fs.writeFile(tempFilePath, file.buffer);

      // Procesa el archivo con ffmpeg
      return await new Promise((resolve, reject) => {
        ffmpeg(tempFilePath)
          .inputFormat('gif')
          .outputOptions([
            '-vcodec libwebp', // Usa el codec correcto para WebP
            '-lossless 0', // No hacer la conversión sin pérdidas (puede ajustarse)
            '-qscale 75', // Ajusta la calidad (0 a 100, siendo 100 la mejor calidad)
            '-preset default', // Usa el preset predeterminado para WebP
            '-loop 0', // Para que la animación WebP se reproduzca en bucle
            '-an', // No incluir audio
            '-vsync 0', // Sincronización de video
          ])
          .output(outputPath)
          .on('end', async () => {
            const metadata = await this.getFfprobeData(outputPath);
            const {
              width,
              height,
              nb_frames: number_frames,
            } = metadata.streams[0] || {};
            const duration_each_frame = metadata.streams[0].avg_frame_rate;
            const { size } = await fs.stat(outputPath);
            fs.remove(tempFilePath); // Elimina el archivo temporal después de procesarlo
            resolve({
              name: outputFileName,
              folder: `uploads/animation`,
              format: 'webp',
              url: `uploads/animation/${outputFileName}`,
              file_size: size,
              width,
              height,
              number_frames,
              duration_each_frame,
            });
          })
          .on('error', (err) => {
            fs.remove(tempFilePath); // Asegúrate de eliminar el archivo en caso de error
            reject(err);
          })
          .run();
      });
    } catch (err) {
      throw err;
    }
  }

  async processVideo(file: Express.Multer.File): Promise<ProcessedFileData> {
    try {
      const outputDir = join(process.cwd(), 'uploads/video');
      this.createFolder(outputDir);

      const outputFileName = this.generateFileName(file.originalname, 'mp4');
      const tempFilePath = join(outputDir, `${Date.now()}-temp`);
      const outputPath = join(outputDir, outputFileName);

      // Guarda temporalmente el archivo
      await fs.writeFile(tempFilePath, file.buffer);

      // Procesa el video con ffmpeg
      return new Promise((resolve, reject) => {
        ffmpeg(tempFilePath)
          .inputFormat('mp4') // Si el archivo es MP4, mantenerlo. Si es otro formato, cambiar o eliminar.
          .outputOptions([
            '-c:v libx264', // Codec de video H.264 para MP4
            '-crf 23', // Control de la tasa de bits (calidad)
            '-preset fast', // Preset para un balance entre velocidad y calidad
            '-movflags +faststart', // Optimiza el archivo para una carga rápida
            '-c:a aac', // Codec de audio
            '-b:a 128k', // Bitrate de audio
            '-vf scale=1280:-2', // Escala el video manteniendo la proporción (ancho de 1280px)
          ])
          .on('end', async () => {
            const metadata = await this.getFfprobeData(outputPath);
            const { width, height } = metadata.streams[0];
            const duration = metadata.format.duration;
            const { size } = await fs.stat(outputPath);
            fs.remove(tempFilePath); // Elimina el archivo temporal
            resolve({
              name: outputFileName,
              folder: `uploads/video`,
              format: 'mp4',
              url: `uploads/video/${outputFileName}`,
              file_size: size,
              duration,
              resolution: `${width}x${height}`,
            });
          })
          .on('error', (err) => {
            fs.remove(tempFilePath); // Elimina el archivo en caso de error
            reject(err);
          })
          .output(outputPath)
          .run();
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.remove(filePath);
    } catch (err) {
      throw err;
    }
  }
}