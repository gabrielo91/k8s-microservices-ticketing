import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@gb-tickets/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of listen
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'foo',
    price: 123,
  });

  await ticket.save();

  // create data fake event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new foo',
    price: 999,
    userId: mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, message };
};

it('updates and saves a ticket', async () => {
  const { listener, data, message, ticket } = await setup();

  // call the onMessageFunction with the data object  + message object
  await listener.onMessage(data, message);

  // write assertions to make sure a ticket was created
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket).toBeDefined();
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('ack the message if ticket is processed', async () => {
  const { listener, data, message } = await setup();

  // call the onMessageFunction with the data object  + message object
  await listener.onMessage(data, message);

  // write assertions to make sure ack functions is called
  expect(message.ack).toHaveBeenCalled();
});
