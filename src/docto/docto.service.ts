import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctoDTO } from './dto/docto.dto';
import { Usuario } from './entities/docto.entity';

@Injectable()
export class DoctoService {
  constructor(
    @InjectRepository(Usuario)
    private readonly doctosRepository: Repository<Usuario>,
  ) {}

  async create(docto: DoctoDTO): Promise<Usuario> {
    return this.doctosRepository.save(docto);
  }

  async findOne(codigo: string): Promise<Usuario> {
    const docto: Usuario = await this.doctosRepository.findOne({
      where: { codigo: codigo },
    });
    if (!docto) {
      throw new NotFoundException();
    } else {
      return docto;
    }
  }

  findAll(): Promise<Usuario[]> {
    return this.doctosRepository.find();
  }

  async update(codigo: string, docto: DoctoDTO): Promise<Usuario> {
    const doctoExist = await this.findOne(codigo);

    const updatedDocto: Usuario = Object.assign(doctoExist, docto);
    return this.doctosRepository.save(updatedDocto);
  }

  async delete(codigo: string): Promise<void> {
    await this.doctosRepository.delete(codigo);
  }
}
