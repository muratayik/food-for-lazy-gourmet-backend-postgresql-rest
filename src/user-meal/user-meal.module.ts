import { Module } from '@nestjs/common';
import { MealModule } from 'src/meal/meal.module';
import { UserMealController } from './user-meal.controller';
import { UserMealService } from './user-meal.service';

@Module({
  imports: [MealModule],
  controllers: [UserMealController],
  providers: [UserMealService],
})
export class UserMealModule {}
