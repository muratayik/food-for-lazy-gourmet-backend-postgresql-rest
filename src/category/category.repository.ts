import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TYPEORM_ERROR_MESSAGES } from 'src/utils/constants';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategories(): Promise<Category[]> {
    return await this.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.findOne(id);

      if (!category) {
        throw new NotFoundException(`Category with id "${id}" not found`);
      }

      return category;
    } catch (error) {
      if (error.code === TYPEORM_ERROR_MESSAGES.UUID_COULD_NOT_BE_CONVERTED) {
        throw new NotFoundException();
      }
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, imageUrl, description } = createCategoryDto;
    const category = this.create({
      name,
      imageUrl,
      description,
    });
    try {
      await this.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { id, name, imageUrl, description } = updateCategoryDto;
    const category = await this.getCategoryById(id);

    category.name = name;
    category.imageUrl = imageUrl;
    category.description = description;

    await this.save(category);
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const { affected } = await this.delete({ id });
    if (!affected) {
      throw new NotFoundException(`Category with ${id} not found`);
    }
  }
}
