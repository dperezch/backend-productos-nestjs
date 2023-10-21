import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria])
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [TypeOrmModule] //se exporta para que productos tenga acceso a categorias
})
export class CategoriasModule {}
