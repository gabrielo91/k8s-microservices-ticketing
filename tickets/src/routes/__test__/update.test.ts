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
      .send({
        title: 'foo2',
        price: 12,
      })
      .expect(401);
  });

  it('returns 400 if user provides an invalid title or price', async () => {
    // await request(app).put('/api/tickets').send({}).expect(400);
  });

  it('should update ticket if user provide valid inputs', async () => {
    // Create ticket
    // assert it
    // update it
    // assert it
  });
});
