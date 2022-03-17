import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealModule } from 'src/meal/meal.module';
import { FavouriteController } from './favourite.controller';
import { FavouriteRepository } from './favourite.repository';
import { FavouriteService } from './favourite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteRepository]), MealModule],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
