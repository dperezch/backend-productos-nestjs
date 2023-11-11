import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Marcas')
@ApiBearerAuth()
@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.marcasService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marcasService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcasService.update(id, updateMarcaDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marcasService.remove(id);
  }
}
