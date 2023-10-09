import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { MarcasModule } from 'src/marcas/marcas.module';
import { MarcasService } from 'src/marcas/marcas.service';
import { ProveedoresModule } from 'src/proveedores/proveedores.module';
import { ProveedoresService } from 'src/proveedores/proveedores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), MarcasModule, ProveedoresModule],//se importa la entidad que ira relacionada
  controllers: [ProductosController],
  providers: [ProductosService, MarcasService, ProveedoresService],//se agrega el servicio de la entidad relacionada
})
export class ProductosModule {}
