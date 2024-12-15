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
  ValidationPipe,
  UsePipes,
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
import { GetAllTicketsQueryDto } from './dto/get-tickets-query.dto';

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
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @Get()
  async getAll(@Query() queryParameters: GetAllTicketsQueryDto) {
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
