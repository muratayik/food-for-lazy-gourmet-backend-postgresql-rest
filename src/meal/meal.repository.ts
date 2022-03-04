import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMealDto } from 'src/category/dto/create-meal.dto';
import { TYPEORM_ERROR_MESSAGES } from 'src/utils/constants';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateMealDto } from '../category/dto/update-meal.dto';
import { Meal } from './meal.entity';

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  async getMeals(): Promise<Meal[]> {
    return await this.find();
  }

  async getMeal(id: string): Promise<Meal> {
    try {
      const meal = await this.findOne({ id });
      if (!meal) {
        throw new NotFoundException(`Meal with id ${id} can not be found`);
      }

      return meal;
    } catch (error) {
      if (error.code === TYPEORM_ERROR_MESSAGES.UUID_COULD_NOT_BE_CONVERTED) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async getMealsByCategoryId(categoryId: string): Promise<Meal[]> {
    return await this.find({ categoryId });
  }

  async createMeal(
    createMealDto: CreateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    const { name, imageUrl, videoUrl, instructions, ingredients } =
      createMealDto;

    const meal = this.create({
      categoryId,
      name,
      imageUrl,
      videoUrl,
      instructions,
      ingredients,
    });

    try {
      await this.save(meal);
      return meal;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateMeal(
    updateMealDto: UpdateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    const { id, name, imageUrl, videoUrl, instructions } = updateMealDto;

    const meal = await this.getMeal(id);
    meal.categoryId = categoryId;
    meal.name = name;
    meal.imageUrl = imageUrl;
    meal.videoUrl = videoUrl;
    meal.instructions = instructions;

    await this.save(meal);
    return meal;
  }

  async deleteMeal(id: string): Promise<Meal> {
    const meal = await this.getMeal(id);
    await this.delete({ id });
    return meal;
  }
}
