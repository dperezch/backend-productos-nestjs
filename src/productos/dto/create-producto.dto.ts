import { IsDate, IsInt, IsOptional, IsPositive, IsString, MinLength, } from "class-validator";

export class CreateProductoDto {

    @IsInt()
    sku: number;

    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    marca: string;

    @IsString()
    @MinLength(2)
    @IsOptional()
    proveedor: string;

    @IsInt()
    cantidad: number;

    @IsInt()
    @IsPositive()
    precio_venta: number;

    @IsInt()
    precio_compra: number;

    @IsDate()
    @IsOptional()
    fecha_compra?: Date;

    @IsOptional()
    fecha_vencimiento?: Date;
}
