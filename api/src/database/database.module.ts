import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';
import { About } from 'src/about/entities/about.entity';
import { FilesRegistration } from 'src/media/entities/filesRegistration.entity';
import { User } from 'src/users/entities/users.entity';
import { VideoRegistration } from 'src/media/entities/videoRegistration.entity';
import { ImagesRegistration } from 'src/media/entities/imageRegistration.entity';
import { GifRegistration } from 'src/media/entities/gifRegistration.entity';
import { VideoDemonReel } from 'src/demon-reel/entities/videoDemonReel.entity';
import { Authentication } from 'src/auth/entities/authentications.entity';
import { Rol } from 'src/auth/entities/rol.entity';
import { RolUser } from 'src/auth/entities/rolUser.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { AnimationProject } from 'src/projects/entities/animationProject.entity';
import { ImagesProject } from 'src/projects/entities/imagesProjects.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config], // Carga la configuración
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY], // Inyecta la configuración con la clave registrada
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, host, database, password, port } = configService.db;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          synchronize: configService.db.synchronize,
          entities: [
            About,
            FilesRegistration,
            User,
            VideoRegistration,
            ImagesRegistration,
            GifRegistration,
            VideoDemonReel,
            Authentication,
            Rol,
            RolUser,
            Project,
            AnimationProject,
            ImagesProject
          ]
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
