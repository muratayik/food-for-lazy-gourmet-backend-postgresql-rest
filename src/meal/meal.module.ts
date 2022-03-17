import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { MealRepository } from './meal.repository';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository]),
    IngredientModule,
    CategoryModule,
  ],
  providers: [MealService],
  exports: [MealService],
  controllers: [MealController],
})
export class MealModule {}
