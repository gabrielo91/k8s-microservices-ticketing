import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@gb-tickets/common';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.patch(
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

    const updatedOrder = orders[0];
    updatedOrder.status = OrderStatus.Cancelled;

    updatedOrder.save();

    res.send(updatedOrder);
  }
);

export { router as deleteOrderRouter };
