import { Publisher, OrderCreatedEvent, Subjects } from '@gb-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
