import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { GetAllTicketsQueryDto } from './dto/get-tickets-query.dto';

@Injectable()
export class TicketsService {
  private readonly ticketsTableName = 'tickets';
  private readonly bookedTicketsViewName = 'booked_tickets_view';
  private readonly minTicketCancellationHour = 3;

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createTicketDto: CreateTicketDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .insert(createTicketDto)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    return data;
  }

  async getAll(queryParameters: GetAllTicketsQueryDto) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .select()
      .match(queryParameters);

    return data;
  }

  async getAllBooked(customer_id: number) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.bookedTicketsViewName)
      .select()
      .eq('customer_id', customer_id);

    return data;
  }

  async findOne(id: number) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .select()
      .eq('ticket_id', id)
      .single();

    return data;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .update(updateTicketDto)
      .eq('ticket_id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error);
    if (data.length === 0)
      throw new NotFoundException(`Can't find flight with id: ${id} to patch.`);

    return data;
  }

  async cancelTicket(customerId: number, ticketId: number) {
    await this.checkCancellableBookedTicketFromId(customerId, ticketId);

    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .delete()
      .match({ customer_id: customerId, ticket_id: ticketId })
      .select()
      .single();

    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .delete()
      .eq('ticket_id', id)
      .select()
      .single();

    return { data, error };
  }

  async checkCancellableBookedTicketFromId(
    customerId: number,
    ticketId: number,
  ) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.bookedTicketsViewName)
      .select()
      .match({ customer_id: customerId, ticket_id: ticketId })
      .single();

    if (error) throw new BadRequestException(error);
    if (!data)
      throw new BadRequestException(`Can't cancel ticket with id: ${ticketId}`);

    const currentTime = new Date();
    const departureTime = new Date(data.time_start);

    const timeDifferenceInHours =
      (departureTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60);

    if (timeDifferenceInHours < this.minTicketCancellationHour) {
      throw new BadRequestException(
        `Ticket with id: ${ticketId} is only cancellable within 3 to 24 hours before flying.`,
      );
    }
  }
}
