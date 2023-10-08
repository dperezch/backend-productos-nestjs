import { IsOptional, IsString } from "class-validator";

export class CreateProveedoreDto {

    @IsString()
    nombre: string;

    @IsOptional()
    contacto: string;

    @IsOptional()
    telefono: number;

    @IsOptional()
    email: string;
}
