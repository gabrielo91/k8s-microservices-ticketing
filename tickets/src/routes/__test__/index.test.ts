import request from 'supertest';
import { app } from '../../app';

const createTicket = async () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'foo',
      price: 10,
    })
    .expect(201);
};

describe('Test get all tickets route', () => {
  it('it should retrieve all tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const { body } = await request(app).get('/api/tickets').send().expect(200);
    expect(body.length).toEqual(3);
  });
});
