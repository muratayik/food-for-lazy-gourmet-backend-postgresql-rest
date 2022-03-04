import { Controller, Get, Param } from '@nestjs/common';
import { Meal } from './meal.entity';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  getMeals(): Promise<Meal[]> {
    return this.mealService.getMeals();
  }

  @Get('/:id')
  getMeal(@Param('id') id: string): Promise<Meal> {
    return this.mealService.getMeal(id);
  }
}
