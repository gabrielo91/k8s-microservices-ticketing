import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '@gb-tickets/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = () => {
  // create an instance of listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // create data fake event
  const data: TicketCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 1,
    title: 'foo',
    price: 123,
    userId: mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, message };
};

it('creates and saves a ticket', async () => {
  const { listener, data, message } = setup();

  // call the onMessageFunction with the data object  + message object
  await listener.onMessage(data, message);

  // write assertions to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('ack the message if ticket is processed', async () => {
  const { listener, data, message } = setup();

  // call the onMessageFunction with the data object  + message object
  await listener.onMessage(data, message);

  // write assertions to make sure ack functions is called
  expect(message.ack).toHaveBeenCalled();
});
