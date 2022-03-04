import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from 'src/meal/meal.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientRepository)
    private ingredientRepository: IngredientRepository,
  ) {}

  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.getIngredients();
  }

  getIngredient(id: string): Promise<Ingredient> {
    return this.ingredientRepository.getIngredient(id);
  }

  createIngredient(
    createIngredientDto: CreateIngredientDto,
    meal: Meal,
  ): Promise<Ingredient> {
    return this.ingredientRepository.createIngredient(
      createIngredientDto,
      meal,
    );
  }

  updateIngredient(
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientRepository.updateIngredient(updateIngredientDto);
  }

  deleteIngredient(id: string): Promise<void> {
    return this.ingredientRepository.deleteIngredient(id);
  }

  deleteIngredientsOfAMeal(meal: Meal): Promise<number> {
    return this.ingredientRepository.deleteIngredientsOfAMeal(meal);
  }
}
