import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { EndpointUserRole } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';
import { RoleGuard } from 'src/guards/user-role.guard';
import { GetAllPlanesQueryDto } from './dto/get-planes-query.dto';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body(ValidationPipe) createPlaneDto: CreatePlaneDto) {
    return await this.planesService.create(createPlaneDto);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @Get()
  async findAll(@Query() queryParameters: GetAllPlanesQueryDto) {
    return await this.planesService.findAll(queryParameters);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.planesService.findOne(id);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePlaneDto: UpdatePlaneDto,
  ) {
    return await this.planesService.update(id, updatePlaneDto);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.planesService.remove(id);
  }
}
