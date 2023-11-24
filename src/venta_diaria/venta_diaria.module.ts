import { Module } from '@nestjs/common';
import { VentaDiariaService } from './venta_diaria.service';
import { VentaDiariaController } from './venta_diaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaDiaria } from './entities/venta_diaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaDiaria])],
  controllers: [VentaDiariaController],
  providers: [VentaDiariaService],
})
export class VentaDiariaModule {}
