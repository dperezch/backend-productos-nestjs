import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly ProveedorRepository: Repository<Proveedor>
  ){}

  async create(createProveedoreDto: CreateProveedoreDto) {
    return await this.ProveedorRepository.save(createProveedoreDto);
  }

  async findAll() {
    return await this.ProveedorRepository.find();
  }

  async findOne(id: number) {
    return await this.ProveedorRepository.findOneBy({id})
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return await this.ProveedorRepository.update({id}, updateProveedoreDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}
