import { Injectable } from '@nestjs/common';
import { CreateVentaDiariaDto } from './dto/create-venta_diaria.dto';
import { UpdateVentaDiariaDto } from './dto/update-venta_diaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaDiaria } from './entities/venta_diaria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentaDiariaService {
  constructor(
    @InjectRepository(VentaDiaria)
    private readonly ventaDiariaRepository: Repository<VentaDiaria>,
  ) {}
  async create(createVentaDiariaDto: CreateVentaDiariaDto) {
    const venta = this.ventaDiariaRepository.create(createVentaDiariaDto);
    return await this.ventaDiariaRepository.save(venta);
  }

  async findAll() {
    return await this.ventaDiariaRepository.find();
  }

  async findOne(id: number) {
    return await this.ventaDiariaRepository.findOneBy({ id });
  }

  async update(id: number, updateVentaDiariaDto: UpdateVentaDiariaDto) {
    return await this.ventaDiariaRepository.update(
      { id },
      updateVentaDiariaDto,
    );
  }

  async remove(id: number) {
    return `This action removes a #${id} ventaDiaria`;
  }

  // Método para obtener la suma de ventas por separado en un rango de fechas
  async getSumOfSalesByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<{
    ventaEfectivo: number;
    ventaTarjeta: number;
    ventaTotal: number;
  }> {
    const salesInRange = await this.ventaDiariaRepository
      .createQueryBuilder('venta_diaria')
      .select('SUM(venta_diaria.venta_efectivo)', 'ventaEfectivo')
      .addSelect('SUM(venta_diaria.venta_tarjeta)', 'ventaTarjeta')
      .addSelect('SUM(venta_diaria.venta_total)', 'ventaTotal')
      .where('venta_diaria.fecha BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return {
      ventaEfectivo: salesInRange.ventaEfectivo || 0,
      ventaTarjeta: salesInRange.ventaTarjeta || 0,
      ventaTotal: salesInRange.ventaTotal || 0,
    };
  }
}
