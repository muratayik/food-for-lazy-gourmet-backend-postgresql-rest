import { Controller, Get } from '@nestjs/common';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  getMeals() {
    return this.mealService.getMeals();
  }
}
