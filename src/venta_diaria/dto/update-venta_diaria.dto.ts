import { PartialType } from '@nestjs/swagger';
import { CreateVentaDiariaDto } from './create-venta_diaria.dto';

export class UpdateVentaDiariaDto extends PartialType(CreateVentaDiariaDto) {}
