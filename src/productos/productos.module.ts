import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { MarcasService } from 'src/marcas/marcas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), MarcasModule],//se importa la entidad que ira relacionada
  controllers: [ProductosController],
  providers: [ProductosService, MarcasService],//se agrega el servicio de la entidad relacionada
})
export class ProductosModule {}
