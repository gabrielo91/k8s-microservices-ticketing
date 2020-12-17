import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent, OrderStatus } from '@gb-tickets/common';
import mongoose from 'mongoose';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();

  // Create and save a ticket (reservation)
  const ticket = Ticket.build({
    title: 'foo',
    price: 99,
    userId: 'asd',
  });

  ticket.set({ orderId });

  await ticket.save();

  // Create the fake data event
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it('updates the ticket, publishes an even and acks the message ', async () => {
  const { listener, data, ticket, msg, orderId } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
