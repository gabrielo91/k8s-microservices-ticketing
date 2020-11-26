import { Publisher, Subjects, TicketUpdatedEvent } from '@gb-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
