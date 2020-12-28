import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/payments/health-check', (req: Request, res: Response) => {
  return res.send({ status: 'ok' });
});

export { router as healthCheckRouter };
