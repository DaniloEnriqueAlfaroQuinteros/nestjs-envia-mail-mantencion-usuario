import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { DoctoController } from './docto.controller';
import { DoctoService } from './docto.service';
import { Usuario } from './entities/docto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), LoggerModule],
  controllers: [DoctoController],
  providers: [DoctoService],
})
export class DoctoModule {}
