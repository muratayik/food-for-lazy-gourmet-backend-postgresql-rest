import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMealDto } from '../dto/create-meal.dto';
import { CreateIngredientDto } from 'src/dto/create-ingredient.dto';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { UpdateMealDto } from '../dto/update-meal.dto';
import { Meal } from './meal.entity';
import { MealRepository } from './meal.repository';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
    private ingredientService: IngredientService,
    private categoryService: CategoryService,
  ) {}

  getMeals(): Promise<Meal[]> {
    return this.mealRepository.getMeals();
  }

  getMeal(mealId: string): Promise<Meal> {
    return this.mealRepository.getMeal(mealId);
  }

  async getMealsByCategoryId(categoryId: string): Promise<Meal[]> {
    await this.categoryService.getCategoryById(categoryId);
    return this.mealRepository.getMealsByCategoryId(categoryId);
  }

  async createMeal(createMealDto: CreateMealDto): Promise<Meal> {
    const { categoryId } = createMealDto;
    await this.categoryService.getCategoryById(categoryId);
    const meal = await this.mealRepository.createMeal(createMealDto);
    await this.createIngredientsForMeal(meal, createMealDto.ingredients);

    return meal;
  }

  async updateMeal(updateMealDto: UpdateMealDto): Promise<Meal> {
    const { categoryId } = updateMealDto;
    await this.categoryService.getCategoryById(categoryId);
    const meal = await this.mealRepository.updateMeal(updateMealDto);
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.createIngredientsForMeal(meal, updateMealDto.ingredients);
    meal.ingredients = updateMealDto.ingredients;
    return meal;
  }

  async deleteMeal(mealId: string): Promise<void> {
    const meal = await this.getMeal(mealId);
    await this.ingredientService.deleteIngredientsOfAMeal(meal);
    await this.mealRepository.deleteMeal(mealId);
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
