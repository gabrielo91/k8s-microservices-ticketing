import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@gb-tickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
      version,
    });

    await ticket.save();

    msg.ack();
  }
}