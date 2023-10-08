import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateMarcaDto {

    @IsString()
    @MinLength(2)
    nombre: string;
}
