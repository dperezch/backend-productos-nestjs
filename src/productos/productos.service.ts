import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

  constructor(

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ){}

  async create(createProductoDto: CreateProductoDto) {

    // Convierte la cadena fecha_vencimiento en un objeto Date si está presente
    if (createProductoDto.fecha_vencimiento) {
      createProductoDto.fecha_vencimiento = new Date(createProductoDto.fecha_vencimiento);

      // Verifica si la conversión fue exitosa
      if (isNaN(createProductoDto.fecha_vencimiento.getTime())) {
        throw new BadRequestException('fecha_vencimiento no es una fecha válida.');
      }
    }

    // Busca un producto existente con el mismo sku y fecha_vencimiento
    const existingProduct = await this.productoRepository.findOne({
      where: {
        sku: createProductoDto.sku,
        fecha_vencimiento: createProductoDto.fecha_vencimiento,
      },
    });

    if (existingProduct) {
      // Si el producto existe, actualiza los datos
      existingProduct.cantidad += createProductoDto.cantidad;
      existingProduct.nombre = createProductoDto.nombre;
      existingProduct.marca = createProductoDto.marca;
      existingProduct.proveedor = createProductoDto.proveedor;
      existingProduct.precio_venta = createProductoDto.precio_venta;
      existingProduct.precio_compra = createProductoDto.precio_compra;
      return await this.productoRepository.save(existingProduct);
    } else {
      // Si el producto no existe, crea uno nuevo
      const producto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(producto);
    }
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne(id: number) {
    return await this.productoRepository.findOneBy({id});
  }

  async findBySku(sku: number) {
    return await this.productoRepository
      .createQueryBuilder('producto')
      .where('producto.sku = :sku', { sku })
      .getMany();
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    return await this.productoRepository.update({id}, updateProductoDto)
  }

  async remove(id: number) {
    return await this.productoRepository.delete({id});
  }
}
