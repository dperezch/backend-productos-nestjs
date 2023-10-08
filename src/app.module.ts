import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasModule } from './marcas/marcas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'user_productos',
      password: 'postgres',
      database: 'db_productos',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductosModule,
    MarcasModule,
    ProveedoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
