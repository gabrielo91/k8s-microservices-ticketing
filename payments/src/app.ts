import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUser, errorHandler, NotFoundError } from '@gb-tickets/common';

import { healthCheckRouter } from './routes/healtcheck';
import { CreateChargeRouter } from './routes/create';

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
app.use(CreateChargeRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
