import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctoDTO } from './dto/docto.dto';
import { Usuario } from './entities/docto.entity';
import { DoctoService } from './docto.service';
import { LoggerService } from '../logger/logger.service';

@Controller('usuario')
@ApiTags('usuario')
export class DoctoController {
  constructor(
    private doctoService: DoctoService,
    private readonly logger: LoggerService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The docto is created',
    type: Usuario,
  })
  @ApiResponse({
    status: 400,
    description: 'The body of docto is not a DoctoDto object',
  })
  @Post()
  create(@Body() doctoDTO: DoctoDTO): Promise<Usuario> {
    return this.doctoService.create(doctoDTO);
  }

  @ApiResponse({ status: 200, description: 'Gets one codigo', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario not found by codigo' })
  @Get(':codigo')
  findOne(@Param('codigo') codigo: string): Promise<Usuario> {
    this.logger.info('Getting un usuario ' + codigo);
    return this.doctoService.findOne(codigo);
  }

  @ApiResponse({
    status: 200,
    description: 'Gets all codigo',
    type: Usuario,
    isArray: true,
  })
  
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.doctoService.findAll();
  }
  

  @Put(':codigo')
  @ApiResponse({
    status: 200,
    description: 'The docto is updated',
    type: Usuario,
  })
  @ApiResponse({
    status: 400,
    description: 'The body of usarios is not a object',
  })
  update(
    @Param('codigo') codigo: string,
    @Body() doctoDTO: DoctoDTO,
  ): Promise<Usuario> {
    return this.doctoService.update(codigo, doctoDTO);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The usuario is deleted' })
  delete(@Param('id') id: string): void {
    this.doctoService.delete(id);
  }
}
