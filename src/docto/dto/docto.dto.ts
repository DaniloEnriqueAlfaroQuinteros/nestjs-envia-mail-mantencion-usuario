import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DoctoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
export class MensajePubSub {
  correlativo: string;
  tipodoc: string;
  sucursal: string;
  mail: string;
  fecha: string;
}
export class CoreNotification {
  correlativo: string;
  tipodoc: string;
  sucursal: string;
  mail: string;
  pdf: string;
  link: string;
}

export class DocumentoDTE {
  correlativo: string;
  tipodoc: string;
  sucursal: string;
  mail: string;
  pdf: string;
  link: string;
}

export class StorageDTE {
  correlativo: string;
  tipodoc: string;
  sucursal: string;
  mail: string;
  pdf: string;
  link: string;
}
