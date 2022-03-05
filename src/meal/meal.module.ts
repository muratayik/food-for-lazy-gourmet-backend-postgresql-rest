import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { MealRepository } from './meal.repository';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository]), IngredientModule],
  providers: [MealService],
  exports: [MealService],
  controllers: [MealController],
})
export class MealModule {}
