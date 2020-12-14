import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

describe('Test create order route', () => {
  it('has a route handler listening to /api/orders for order requests', async () => {
    const response = await request(app).post('/api/orders').send({});
    expect(response).not.toEqual(404);
  });

  it('can only be accessed if user is logged in', async () => {
    await request(app).post('/api/orders').send({}).expect(401);
  });

  it('returns error 400 if invalid data is provided', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({})
      .expect(400);
  });

  it('returns error 404 if ticket that user is trying to order does not exist', async () => {
    const order = {
      ticketId: new mongoose.Types.ObjectId().toHexString(),
    };

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send(order)
      .expect(404);
  });

  it('returns error 400 if selected ticket is already reserved', async () => {
    const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title: 'foo',
      price: 32,
    });
    await ticket.save();

    const reservedOrder = Order.build({
      ticket: ticket,
      status: OrderStatus.Created,
      userId: '123',
      expiresAt: new Date(),
    });

    await reservedOrder.save();

    const order = {
      ticketId: ticket.id,
    };

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send(order)
      .expect(400);
  });

  it('reserves a ticket', async () => {
    const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title: 'foo',
      price: 32,
    });
    await ticket.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  it('emits an order created event', async () => {
    const ticket = Ticket.build({
      id: mongoose.Types.ObjectId().toHexString(),
      title: 'foo',
      price: 32,
    });
    await ticket.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
