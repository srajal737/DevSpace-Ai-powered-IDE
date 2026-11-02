import express from 'express'
import { chatbot } from '../controller/AIcalling.js';

const router = express.Router();
router.post('/chat', chatbot);
export default router