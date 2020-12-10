import { Ticket } from './ticket';

it('implements Optimistic Concurrency Control', async () => {
  // create an instance
  const ticket = Ticket.build({
    title: 'foo',
    price: 133,
    userId: '123',
  });

  // save the ticket
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separated changes to the ticket
  firstInstance!.set({ price: 456 });
  secondInstance!.set({ price: 14 });

  // save the first, should works
  await firstInstance!.save();

  // save the second, should fails
  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number in multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'foo',
    price: 133,
    userId: '123',
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();

  expect(ticket.version).toEqual(1);
});
