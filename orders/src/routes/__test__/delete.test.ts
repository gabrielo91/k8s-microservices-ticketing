import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

const buildTicket = async () => {
  return Ticket.build({
    title: 'foo',
    price: 45,
    version: 1,
  }).save();
};

describe('cancel an specific order', () => {
  it('update order status to cancelled and returns it', async () => {
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
      .patch(`/api/orders/${id}`)
      .set('Cookie', userOne)
      .expect(200);

    expect(body.id).toEqual(id);
    expect(body.status).toEqual(OrderStatus.Cancelled);
  });

  it('emits an order cancelled event', async () => {
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
      .patch(`/api/orders/${id}`)
      .set('Cookie', userOne)
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();g
  });
});
