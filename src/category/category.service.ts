import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/auth/user-role.enum';
import { User } from 'src/auth/user.model';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.getCategoryById(id);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.updateCategory(updateCategoryDto);
  }

  deleteCategory(id: string): Promise<void> {
    return this.categoryRepository.deleteCategory(id);
  }
}
