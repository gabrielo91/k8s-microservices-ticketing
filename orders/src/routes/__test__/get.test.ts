import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  return Ticket.build({
    title: 'foo',
    price: 45,
    version: 1,
  }).save();
};

describe('fetch orders for an particular user', () => {
  it('should return all the orders associated to an user', async () => {
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = global.signin();
    const userTwo = global.signin();

    // Create a ticket as User #1
    await request(app)
      .post('/api/orders')
      .set('Cookie', userOne)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    // Create two orders as User #2
    const { body: orderOne } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticketTwo.id })
      .expect(201);

    const { body: orderTwo } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({ ticketId: ticketThree.id })
      .expect(201);

    const result = await request(app)
      .get('/api/orders')
      .set('Cookie', userTwo)
      .expect(200);

    expect(result.body.length).toEqual(2);
    expect(result.body[0].id).toEqual(orderOne.id);
    expect(result.body[1].id).toEqual(orderTwo.id);
    expect(result.body[0].ticket.id).toEqual(ticketTwo.id);
    expect(result.body[1].ticket.id).toEqual(ticketThree.id);
  });

  it('returns an specific order by id', async () => {
    const ticketOne = await buildTicket();
    const userOne = global.signin();

    const {
      body: { id },
    } = await request(app)
      .post('/api/orders')
      .set('Cookie', userOne)
      .send({ ticketId: ticketOne.id })
      .expect(201);

    const { body } = await request(app)
      .get(`/api/orders/${id}`)
      .set('Cookie', userOne)
      .expect(200);
    expect(body.id).toEqual(id);
  });
});
