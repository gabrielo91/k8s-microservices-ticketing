import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

describe('Test updating tickets process', () => {
  it('returns 404 if provided id does not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'foo',
        price: 10,
      })
      .expect(404);
  });

  it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'foo',
        price: 10,
      })
      .expect(401);
  });

  it('returns 401 if user is not own the ticket', async () => {
    const { body: ticket } = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        title: 'foo',
        price: 10,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${ticket.id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'foo2',
        price: 12,
      })
      .expect(401);
  });

  it('returns 400 if user provides an invalid title or price', async () => {
    const cookie = global.signin();
    const { body: ticket } = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'foo',
        price: 10,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${ticket.id}`)
      .set('Cookie', cookie)
      .send({
        price: 12,
      })
      .expect(400);
    await request(app)
      .put(`/api/tickets/${ticket.id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'foo',
      })
      .expect(400);
  });

  it('should update ticket if user provide valid inputs', async () => {
    const cookie = global.signin();

    const updatedTicket = {
      title: 'foo2',
      price: 20,
    };
    const { body: ticket } = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'foo',
        price: 10,
      })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${ticket.id}`)
      .set('Cookie', cookie)
      .send(updatedTicket)
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${ticket.id}`)
      .expect(200);

    expect(ticketResponse.body.title).toEqual(updatedTicket.title);
    expect(ticketResponse.body.price).toEqual(updatedTicket.price);
  });
});
