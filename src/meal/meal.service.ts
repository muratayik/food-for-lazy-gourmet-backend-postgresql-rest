import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
  ) {}

  getMeals(): Promise<Meal[]> {
    return this.mealRepository.getMeals();
  }

  getMeal(id: string): Promise<Meal> {
    return this.mealRepository.getMeal(id);
  }

  getMealsByCategoryId(categoryId: string): Promise<Meal[]> {
    return this.mealRepository.getMealsByCategoryId(categoryId);
  }

  createMeal(createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealRepository.createMeal(createMealDto);
  }

  updateMeal(updateMealDto: UpdateMealDto): Promise<Meal> {
    return this.mealRepository.updateMeal(updateMealDto);
  }

  deleteMeal(id: string): Promise<void> {
    return this.mealRepository.deleteMeal(id);
  }
}
