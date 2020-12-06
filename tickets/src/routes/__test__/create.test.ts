import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

const newTicket = { title: 'foo', price: 10 };

describe('Test create ticket route', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send(newTicket);
    expect(response.status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send(newTicket).expect(401);
  });

  it('returns a status other than 401 if the user is not signed in', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(newTicket);

    expect(response.status).not.toEqual(401);
  });

  it('return error if an invalid price is provided', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        ticket: '',
        price: 10,
      })
      .expect(400);

    const response2 = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it('return error in an invalid price is provided', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        ticket: 'my-ticket',
        price: -10,
      })
      .expect(400);

    const response2 = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        ticket: 'my-ticket',
      })
      .expect(400);
  });

  it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(newTicket)
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual('foo');
    expect(tickets[0].price).toEqual(10);
  });

  it('publishes an event', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(newTicket)
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
