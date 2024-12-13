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
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { EndpointUserRole } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';
import { RoleGuard } from 'src/guards/user-role.guard';
import {
  SignedInUserDto,
  signedInUserPayloadKey,
} from 'src/auth/dto/signed-in-user.dto';

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
  async getAll(
    @Query('customer_id') customer_id?: number,
    @Query('flight_id') flight_id?: number,
    @Query('booking_date') booking_date?: string,
    @Query('adult_count') adult_count?: number,
    @Query('children_count') children_count?: number,
    @Query('infant_count') infant_count?: number,
    @Query('total_passengers') total_passengers?: number,
  ) {
    const queryParameters: any = {};

    if (customer_id !== undefined) queryParameters.customer_id = customer_id;
    if (flight_id !== undefined) queryParameters.flight_id = flight_id;
    if (booking_date !== undefined) queryParameters.booking_date = booking_date;
    if (adult_count !== undefined) queryParameters.adult_count = adult_count;
    if (children_count !== undefined)
      queryParameters.children_count = children_count;
    if (infant_count !== undefined) queryParameters.infant_count = infant_count;
    if (total_passengers !== undefined)
      queryParameters.total_passengers = total_passengers;

    return await this.ticketsService.getAll(queryParameters);
  }

  @EndpointUserRole(UserRole.Customer)
  @UseGuards(RoleGuard)
  @Get('booked')
  async getAllBooked(@Request() request) {
    const signedInUserDto: SignedInUserDto = request[signedInUserPayloadKey];
    return await this.ticketsService.getAllBooked(signedInUserDto.userId);
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
    const signedInUserDto: SignedInUserDto = request[signedInUserPayloadKey];
    return await this.ticketsService.cancelTicket(
      signedInUserDto.userId,
      ticketId,
    );
  }
}
