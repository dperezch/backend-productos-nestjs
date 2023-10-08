import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { MarcasService } from 'src/marcas/marcas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), MarcasModule],
  controllers: [ProductosController],
  providers: [ProductosService, MarcasService],
})
export class ProductosModule {}
