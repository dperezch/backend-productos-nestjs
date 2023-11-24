import { IsDate, IsInt, IsPositive } from "class-validator";

export class CreateVentaDiariaDto {
    @IsInt()
    id: number;

    @IsDate()
    fecha: Date;

    @IsInt()
    @IsPositive()
    venta_efectivo: number;

    @IsInt()
    @IsPositive()
    venta_tarjeta: number;

    @IsInt()
    @IsPositive()
    venta_total: number;
}
