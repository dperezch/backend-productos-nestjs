import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './entities/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  controllers: [MarcasController],
  providers: [MarcasService],
  exports: [TypeOrmModule] //exporta para que Producto pueda tener acceso a Marca
                            //a su vez, en Producto se importa MarcasModule
})
export class MarcasModule {}
