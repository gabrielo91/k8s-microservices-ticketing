import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler, NotFoundError } from '@gb-tickets/common';

import { healthCheckRouter } from './routes/healtcheck';
import { createOrderRouter } from './routes/create';
import { getOrderRouter } from './routes/get';
import { deleteOrderRouter } from './routes/delete';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(healthCheckRouter);
app.use(currentUser);
app.use(createOrderRouter);
app.use(getOrderRouter);
app.use(deleteOrderRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
