import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Proveedor } from 'src/proveedores/entities/proveedore.entity';


@Injectable()
export class ProductosService {

  constructor(

    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,

    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,

    @InjectRepository(Proveedor)
    private readonly proveedoresRepository: Repository<Proveedor>

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
    const existingProduct = await this.productosRepository.findOne({
      where: {
        sku: createProductoDto.sku,
        fecha_vencimiento: createProductoDto.fecha_vencimiento,
      },
    });

    // Verifica la marca
    const marca =  await this.marcasRepository.findOneBy({
      nombre: createProductoDto.marca,
    })

    //si no existe la marca, lanza error
    if(!marca) {
      throw new BadRequestException('Marca no encontrada');
    }

    // Verifica el proveedor
    const proveedor = await this.proveedoresRepository.findOneBy({
      nombre: createProductoDto.proveedor,
    })

    // si no existe el proveedor, lanza error
    if(!proveedor){
      throw new BadRequestException('Proveedor no encontrado')
    }

    //crea el producto
    const producto = this.productosRepository.create({
      ...createProductoDto,
      marca,
      proveedor
    })

    if (existingProduct) {
      // Si el producto existe, actualiza los datos
      existingProduct.cantidad += createProductoDto.cantidad;
      existingProduct.nombre = createProductoDto.nombre;
      existingProduct.marca = marca;
      existingProduct.proveedor = proveedor;
      existingProduct.precio_venta = createProductoDto.precio_venta;
      existingProduct.precio_compra = createProductoDto.precio_compra;
      return await this.productosRepository.save(existingProduct);
    } else {
      // Si el producto no existe, crea uno nuevo
      return await this.productosRepository.save(producto);
    }
  }

  async findAll() {
    return await this.productosRepository.find();
  }

  async findOne(id: number) {
    return await this.productosRepository.findOneBy({id});
  }

  async findBySku(sku: number) {
    return await this.productosRepository
      .createQueryBuilder('producto')
      .where('producto.sku = :sku', { sku })
      .getMany();
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    //Busca si existe el producto
    const producto = await this.productosRepository.findOneBy({id});

    //Si no existe lanza error
    if (!producto) throw new BadRequestException('Producto no existe')

    let marca;
    let proveedor;
    // comprueba si se agregó una marca en la actualización y luego si existe en la tabla marcas, sino lanza error
    if(updateProductoDto.marca){
      marca = await this.marcasRepository.findOneBy({
        nombre: updateProductoDto.marca,
      });
      if(!marca) throw new BadRequestException('Marca no encontrada')
    }

    // Comprueba si se agrego un proveedor en la actualización y luego si existe en la tabla proveedor, sino lanza error
    if(updateProductoDto.proveedor){
      proveedor = await this.proveedoresRepository.findOneBy({
        nombre: updateProductoDto.proveedor,
      });
      if(!proveedor) throw new BadRequestException('Proveedor no encontrado')
    }

    //agrega toda la información del producto perteneciente al id, luego agrega y sobreescribe los datos enviados en la actualización
    // y por último agrega o sobreescribe la marca si es que existió

    return await this.productosRepository.save({
      ...producto,
      ...updateProductoDto,
      marca,
      proveedor
    })

  }

  async remove(id: number) {
    return await this.productosRepository.delete({id});
  }
}
