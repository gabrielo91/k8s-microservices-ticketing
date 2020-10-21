import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('Test get tickets route', () => {
  it('returns 404 if ticket is not found', async () => {
    const objectId = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${objectId}`).send().expect(404);
  });

  it('returns the ticket if ticket is found', async () => {
    const newTicket = {
      title: 'foo',
      price: 10,
    };

    const {
      body: { id },
    } = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(newTicket)
      .expect(201);

    const { body } = await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(200);

    expect(body.title).toEqual(newTicket.title);
    expect(body.price).toEqual(newTicket.price);
  });
});
