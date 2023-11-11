import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Proveedores')
@ApiBearerAuth()
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.proveedoresService.create(createProveedoreDto);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proveedoresService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProveedoreDto: UpdateProveedoreDto) {
    return this.proveedoresService.update(id, updateProveedoreDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.proveedoresService.remove(id);
  }
}
