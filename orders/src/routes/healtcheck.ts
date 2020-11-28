import express from 'express';

const router = express.Router();

router.get('/api/tickets/health-check', (req, res) => {
  return res.send({ status: 'ok' });
});

export { router as healthCheckRouter };
