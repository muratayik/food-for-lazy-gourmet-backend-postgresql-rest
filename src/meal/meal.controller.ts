import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMealDto } from 'src/dto/create-meal.dto';
import { UpdateMealDto } from 'src/dto/update-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  getMeals() {
    return this.mealService.getMeals();
  }

  @Get('/:mealId')
  getMeal(@Param('mealId') mealId: string) {
    return this.mealService.getMeal(mealId);
  }

  @Get('/byCategoryId/:categoryId')
  getMealsByCategoryId(@Param('categoryId') categoryId: string) {
    return this.mealService.getMealsByCategoryId(categoryId);
  }

  @Post()
  createMeal(@Body() createMealDto: CreateMealDto) {
    return this.mealService.createMeal(createMealDto);
  }

  @Patch()
  updateMeal(@Body() updateMealDto: UpdateMealDto) {
    return this.mealService.updateMeal(updateMealDto);
  }
}
