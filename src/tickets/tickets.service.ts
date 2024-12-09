import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class TicketsService {
  private readonly ticketsTableName = 'tickets';

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createTicketDto: CreateTicketDto) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .insert(createTicketDto)
      .select()
      .single();

    return data;
  }

  async getAll() {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .select();

    return data;
  }

  async getAllBooked(customer_id: number) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
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
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.ticketsTableName)
      .delete()
      .match({ customer_id: customerId, ticket_id: ticketId })
      .select()
      .single();

    if (error) throw new BadRequestException(error);
    if (data === null)
      throw new BadRequestException(`Can't cancel ticket with id: ${ticketId}`);

    return { data, error };
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
}
