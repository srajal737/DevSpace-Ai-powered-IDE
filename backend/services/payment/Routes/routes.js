import express from 'express'
import { createOrder, getPaymentHistory, paymentVerify } from '../controller/plans.js';

const router = express.Router();
router.post('/createPayment' , createOrder);
router.post('/paymentVerify' , paymentVerify);
router.get("/history", getPaymentHistory);
export default router;