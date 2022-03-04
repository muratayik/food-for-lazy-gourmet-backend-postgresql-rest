import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TYPEORM_ERROR_MESSAGES } from 'src/utils/constants';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
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

  async createMeal(createMealDto: CreateMealDto): Promise<Meal> {
    const { categoryId, name, imageUrl, videoUrl, instructions } =
      createMealDto;

    const meal = this.create({
      categoryId,
      name,
      imageUrl,
      videoUrl,
      instructions,
    });

    try {
      await this.save(meal);
      return meal;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateMeal(updateMealDto: UpdateMealDto): Promise<Meal> {
    const { id, categoryId, name, imageUrl, videoUrl, instructions } =
      updateMealDto;

    const meal = await this.getMeal(id);
    meal.categoryId = categoryId;
    meal.name = name;
    meal.imageUrl = imageUrl;
    meal.videoUrl = videoUrl;
    meal.instructions = instructions;

    await this.save(meal);
    return meal;
  }

  async deleteMeal(id: string): Promise<void> {
    const { affected } = await this.delete({ id });
    if (!affected) {
      throw new NotFoundException(`Meal with id ${id} not found`);
    }
  }
}