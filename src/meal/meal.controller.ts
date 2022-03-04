import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
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

  @Get('/:categoryId/meals')
  getMealsByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<Meal[]> {
    return this.mealService.getMealsByCategoryId(categoryId);
  }

  @Post()
  createMeal(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealService.createMeal(createMealDto);
  }

  @Patch()
  updateMeal(@Body() updateMealDto: UpdateMealDto): Promise<Meal> {
    return this.mealService.updateMeal(updateMealDto);
  }

  @Delete('/:id')
  deleteMeal(@Param('id') id: string): Promise<void> {
    return this.mealService.deleteMeal(id);
  }
}
