import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from 'src/meal/meal.entity';
import { MealService } from 'src/meal/meal.service';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private mealService: MealService,
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.getCategoryById(id);
  }

  getMealsOfCategory(categoryId: string): Promise<Meal[]> {
    return this.mealService.getMealsByCategoryId(categoryId);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async createMeal(
    createMealDto: CreateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    await this.getCategoryById(categoryId);
    return this.mealService.createMeal(createMealDto, categoryId);
  }

  updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.updateCategory(updateCategoryDto);
  }

  async updateMeal(
    updateMealDto: UpdateMealDto,
    categoryId: string,
  ): Promise<Meal> {
    await this.getCategoryById(categoryId);
    return this.mealService.updateMeal(updateMealDto, categoryId);
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryContainsMeal =
      await this.mealService.doesCategoryContainsMeal(id);
    if (categoryContainsMeal) {
      throw new BadRequestException(
        `Category ${id} has meals defined. Delete meals first`,
      );
    }
    return this.categoryRepository.deleteCategory(id);
  }

  async deleteMeal(categoryId: string, mealId: string): Promise<void> {
    await this.getCategoryById(categoryId);
    return await this.mealService.deleteMeal(mealId);
  }
}
