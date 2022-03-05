import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealDto } from '../dto/create-meal.dto';
import { CreateIngredientDto } from 'src/dto/create-ingredient.dto';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { UpdateMealDto } from '../dto/update-meal.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
    private ingredientService: IngredientService,
  ) {}

  getMeals(): Promise<Meal[]> {
    return this.mealRepository.getMeals();
  }

  getMeal(categoryId: string, mealId: string): Promise<Meal> {
    return this.mealRepository.getMeal(categoryId, mealId);
  }

  getMealsByCategoryId(categoryId: string): Promise<Meal[]> {
    return this.mealRepository.getMealsByCategoryId(categoryId);
  }

  async createMeal(
    createMealDto: CreateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    const meal = await this.mealRepository.createMeal(
      createMealDto,
      categoryId,
    );
    await this.createIngredientsForMeal(meal, createMealDto.ingredients);

    return meal;
  }

  async updateMeal(
    updateMealDto: UpdateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    const meal = await this.mealRepository.updateMeal(
      updateMealDto,
      categoryId,
    );
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.createIngredientsForMeal(meal, updateMealDto.ingredients);
    meal.ingredients = updateMealDto.ingredients;
    return meal;
  }

  async deleteMeal(categoryId: string, mealId: string): Promise<void> {
    const meal = await this.getMeal(categoryId, mealId);
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.mealRepository.deleteMeal(categoryId, mealId);
  }

  async doesCategoryContainsMeal(categoryId: string): Promise<boolean> {
    const numberOfMealsInCategory = await this.findNumberOfMealsInCategory(
      categoryId,
    );
    return numberOfMealsInCategory > 0;
  }

  async findNumberOfMealsInCategory(categoryId: string): Promise<number> {
    return await this.mealRepository.count({
      categoryId,
    });
  }

  async createIngredientsForMeal(
    meal: Meal,
    ingredients: Ingredient[],
  ): Promise<void> {
    ingredients.forEach((i) => {
      const { amount, name } = i;
      const createIngredientDto: CreateIngredientDto = {
        name,
        amount,
      };
      this.ingredientService.createIngredient(createIngredientDto, meal);
    });
  }
}
