import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VentaDiariaService } from './venta_diaria.service';
import { CreateVentaDiariaDto } from './dto/create-venta_diaria.dto';
import { UpdateVentaDiariaDto } from './dto/update-venta_diaria.dto';

@Controller('venta-diaria')
export class VentaDiariaController {
  constructor(private readonly ventaDiariaService: VentaDiariaService) {}

  @Post()
  create(@Body() createVentaDiariaDto: CreateVentaDiariaDto) {
    return this.ventaDiariaService.create(createVentaDiariaDto);
  }

  @Get()
  findAll() {
    return this.ventaDiariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ventaDiariaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVentaDiariaDto: UpdateVentaDiariaDto) {
    return this.ventaDiariaService.update(id, updateVentaDiariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ventaDiariaService.remove(id);
  }

  @Get('sum-of-sales')
  async getSumOfSalesByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sumOfSales = await this.ventaDiariaService.getSumOfSalesByDateRange(start, end);

    return sumOfSales;
  }
}
