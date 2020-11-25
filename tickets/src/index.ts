import 'express-async-errors';
import { app } from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect(
      'ticketing',
      'client-id-tickets',
      'http://nats-srv:4222'
    );
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Tickets connected to mongo DB');
  } catch (error) {
    console.error(error);
  }

  try {
  } catch (error) {}

  app.listen(PORT, () => {
    console.log(`Listening Tickets on port ${PORT}`);
  });
};

start();
