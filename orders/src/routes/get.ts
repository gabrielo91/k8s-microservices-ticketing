import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@gb-tickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const orders = await Order.find({
      userId: req.currentUser!.id,
      _id: orderId,
    }).populate('ticket');

    if (!orders || orders.length < 1) {
      throw new NotFoundError();
    }
    res.send(orders[0]);
  }
);

export { router as getOrderRouter };
