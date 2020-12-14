import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent, OrderStatus } from '@gb-tickets/common';
import mongoose from 'mongoose';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket (reservation)
  const ticket = Ticket.build({
    title: 'foo',
    price: 99,
    userId: 'asd',
  });

  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date().toISOString(),
    status: OrderStatus.Created,
    userId: 'foo',
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('sets the userId of the ticket ', async () => {
  const { listener, data, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
