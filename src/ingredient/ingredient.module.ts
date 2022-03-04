import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
