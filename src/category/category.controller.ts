import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUserEmail } from 'src/get-user.decorator';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(@GetUserEmail() email: string): Promise<Category[]> {
    console.log(email);
    return this.categoryService.getCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch()
  updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(updateCategoryDto);
  }
}
