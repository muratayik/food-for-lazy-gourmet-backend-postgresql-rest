import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
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
}
