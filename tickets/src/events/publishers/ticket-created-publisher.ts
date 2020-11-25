import { Publisher, Subjects, TicketCreatedEvent } from '@gb-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
