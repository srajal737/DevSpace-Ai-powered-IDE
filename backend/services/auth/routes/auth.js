import express from 'express'
import { googlelogin, logout } from '../controllers/auth.js';
import { creditAdd, creditMinus, getCredits } from '../controllers/credits.js';
const router = express.Router();

router.post('/googlelogin',googlelogin);
router.post('/logout' , logout );
router.post('/user/credit-minus',creditMinus);
router.post('/user/credit-add',creditAdd);
router.get('/user/getCredits',getCredits);
export default router