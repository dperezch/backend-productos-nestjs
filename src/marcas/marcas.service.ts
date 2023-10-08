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
    return await this.marcaRepository.find();
  }

  async findOne(id: number) {
    return await this.marcaRepository.findOneBy({id})
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return await this.marcaRepository.update({id}, updateMarcaDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}
