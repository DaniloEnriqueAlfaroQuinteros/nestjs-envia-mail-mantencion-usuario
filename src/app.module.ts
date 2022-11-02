import { HttpModule } from '@nestjs/axios';
import { LoggerService } from './logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './docto/entities/docto.entity';
import { DoctoModule } from './docto/docto.module';
import { DoctoService } from './docto/docto.service';
import { LoggerModule } from 'src/logger/logger.module';
import { DoctoController } from './docto//docto.controller';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    LoggerModule,
    TerminusModule,
    HttpModule,
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.mssql.host'),
        port: configService.get<number>('database.mssql.port'),
        username: configService.get<string>('database.mssql.username'),
        password: configService.get<string>('database.mssql.password'),
        database: configService.get<string>('database.mssql.database'),
        entities: [Usuario],
        keepConnectionAlive: true,
        synchronize: false, //true crea la tabla
        autoLoadEntities: true,
        options: { encrypt: true },
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [DoctoController, HealthController],
  providers: [
    LoggerService,
    { provide: 'logName', useValue: '' },
    DoctoService,
  ],
})
export class AppModule {}
