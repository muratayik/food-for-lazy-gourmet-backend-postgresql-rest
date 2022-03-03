import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  getIngredientByMealId(mealId: string): Promise<Ingredient[]> {
    return this.ingredientRepository.getIngredientByMealId(mealId);
  }

  getIngredient(id: string): Promise<Ingredient> {
    return this.ingredientRepository.getIngredient(id);
  }

  createIngredient(
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientRepository.createIngredient(createIngredientDto);
  }

  updateIngredient(
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientRepository.updateIngredient(updateIngredientDto);
  }

  deleteIngredient(id: string): Promise<void> {
    return this.ingredientRepository.deleteIngredient(id);
  }
}
