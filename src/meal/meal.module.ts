import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealController } from './meal.controller';
import { MealRepository } from './meal.repository';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository])],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
