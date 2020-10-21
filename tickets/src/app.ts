import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler, NotFoundError } from '@gb-tickets/common';

import { healthCheckRouter } from './routes/healtcheck';
import { createTicketsRouter } from './routes/create';
import { getTicketsRouter } from './routes/get';
import { indexRouter } from './routes/';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(healthCheckRouter);
app.use(currentUser);
app.use(createTicketsRouter);
app.use(getTicketsRouter);
app.use(indexRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
