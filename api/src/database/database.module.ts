import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],  // Carga la configuración
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
          synchronize: configService.db.synchronize,  // Añadir cualquier otra configuración necesaria
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}