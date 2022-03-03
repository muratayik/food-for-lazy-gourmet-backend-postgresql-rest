import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TYPEORM_ERROR_MESSAGES } from 'src/utils/constants';
import { EntityRepository, Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async getIngredients(): Promise<Ingredient[]> {
    return await this.find();
  }

  async getIngredientByMealId(mealId: string): Promise<Ingredient[]> {
    return await this.find({ mealId });
  }

  async getIngredient(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.findOne({ id });

      if (!ingredient) {
        throw new NotFoundException(`Ingredient with id ${id} not found`);
      }

      return ingredient;
    } catch (error) {
      if (error.code === TYPEORM_ERROR_MESSAGES.UUID_COULD_NOT_BE_CONVERTED) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async createIngredient(
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    const { name, amount, mealId } = createIngredientDto;

    const ingredient = this.create({
      name,
      amount,
      mealId,
    });

    try {
      await this.save(ingredient);
      return ingredient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateIngredient(
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    try {
      const { id, name, amount } = updateIngredientDto;
      const ingredient = await this.getIngredient(id);

      ingredient.name = name;
      ingredient.amount = amount;

      await this.save(ingredient);
      return ingredient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteIngredient(id: string): Promise<void> {
    const { affected } = await this.delete({ id });
    if (!affected) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }
  }
}
