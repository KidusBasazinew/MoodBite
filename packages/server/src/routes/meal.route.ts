import express from 'express';
import { createMeal } from '../controllers/meal.controller.ts';

const router = express.Router();

router.post('/', createMeal);

export default router;
