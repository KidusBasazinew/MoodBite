import express from 'express';
import {
   createMeal,
   getMeal,
   getNutritionByMealId,
} from '../controllers/meal.controller.ts';

const router = express.Router();

router.post('/', createMeal);
router.get('/:id', getMeal);
router.get('/nutrition/:id', getNutritionByMealId);

export default router;
