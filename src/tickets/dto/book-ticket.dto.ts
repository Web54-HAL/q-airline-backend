import { OmitType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';

export class BookTicketDto extends OmitType(CreateTicketDto, [
  'customer_id',
] as const) {}
