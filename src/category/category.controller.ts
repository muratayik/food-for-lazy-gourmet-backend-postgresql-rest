import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Meal } from 'src/meal/meal.entity';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('/:categoryId/meals')
  getMealsOfCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.getMealsOfCategory(categoryId);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('/:categoryId')
  createMeal(
    @Param('categoryId') categoryId: string,
    @Body() createMealDto: CreateMealDto,
  ): Promise<Meal> {
    return this.categoryService.createMeal(createMealDto, categoryId);
  }

  @Patch()
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Patch('/:categoryId')
  updateMeal(
    @Param('categoryId') categoryId: string,
    @Body() updateMealDto: UpdateMealDto,
  ): Promise<Meal> {
    return this.categoryService.updateMeal(updateMealDto, categoryId);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }

  @Delete('/:categoryId/:mealId')
  deleteMeal(
    @Param('categoryId') categoryId: string,
    @Param('mealId') mealId: string,
  ): Promise<void> {
    return this.categoryService.deleteMeal(categoryId, mealId);
  }
}
