import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcasService {

  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>
  ){}

  async create(createMarcaDto: CreateMarcaDto) {
    return await this.marcaRepository.save(createMarcaDto);
  }

  async findAll() {
    return `This action returns all marcas`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} marca`;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return `This action updates a #${id} marca`;
  }

  async remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}
