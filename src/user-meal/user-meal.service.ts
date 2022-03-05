import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMealDto } from 'src/dto/create-meal.dto';
import { UpdateMealDto } from 'src/dto/update-meal.dto';
import { Meal } from 'src/meal/meal.entity';
import { MealService } from 'src/meal/meal.service';

@Injectable()
export class UserMealService {
  constructor(private mealService: MealService) {}

  getMealsOfUser(userId: string): Promise<Meal[]> {
    return this.mealService.getMealsByCategoryId(userId);
  }

  async createMeal(
    createMealDto: CreateMealDto,
    userId: string,
  ): Promise<Meal> {
    const numberOfMealsInCategory =
      await this.mealService.findNumberOfMealsInCategory(userId);
    if (numberOfMealsInCategory >= 2) {
      throw new BadRequestException('A user can not have more then 2 meals');
    }
    return this.mealService.createMeal(createMealDto, userId);
  }

  updateMeal(updateMealDto: UpdateMealDto, userId: string): Promise<Meal> {
    return this.mealService.updateMeal(updateMealDto, userId);
  }

  deleteMeal(userId: string, mealId: string): Promise<void> {
    return this.mealService.deleteMeal(userId, mealId);
  }
}
