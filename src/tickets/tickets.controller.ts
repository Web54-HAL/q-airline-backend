import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { EndpointUserRole } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';
import { RoleGuard } from 'src/guards/user-role.guard';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @EndpointUserRole(UserRole.Customer)
  @UseGuards(RoleGuard)
  @Post('book')
  async bookTicket(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Get()
  async getAll() {
    return await this.ticketsService.getAll();
  }

  @EndpointUserRole(UserRole.Customer)
  @UseGuards(RoleGuard)
  @Get('booked')
  async getAllBooked(@Request() request) {
    const { id } = request['user'];
    return await this.ticketsService.getAllBooked(id);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.ticketsService.findOne(id);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return await this.ticketsService.update(+id, updateTicketDto);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.ticketsService.remove(id);
  }

  @EndpointUserRole(UserRole.Customer)
  @UseGuards(RoleGuard)
  @Delete('cancel/:ticketId')
  async cancelTicket(
    @Request() request,
    @Param('ticketId', ParseIntPipe) ticketId: number,
  ) {
    const { id } = request['user'];
    return await this.ticketsService.cancelTicket(id, ticketId);
  }
}
