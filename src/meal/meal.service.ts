import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from 'src/ingredient/dto/create-ingredient.dto';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
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

  getMeal(id: string): Promise<Meal> {
    return this.mealRepository.getMeal(id);
  }

  getMealsByCategoryId(categoryId: string): Promise<Meal[]> {
    return this.mealRepository.getMealsByCategoryId(categoryId);
  }

  async createMeal(createMealDto: CreateMealDto): Promise<Meal> {
    const meal = await this.mealRepository.createMeal(createMealDto);
    await this.createIngredientsForMeal(meal, createMealDto.ingredients);

    return meal;
  }

  async updateMeal(updateMealDto: UpdateMealDto): Promise<Meal> {
    const meal = await this.mealRepository.updateMeal(updateMealDto);
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.createIngredientsForMeal(meal, updateMealDto.ingredients);
    return meal;
  }

  async deleteMeal(id: string): Promise<void> {
    const meal = await this.getMeal(id);
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.mealRepository.deleteMeal(id);
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
