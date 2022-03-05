import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository])],
  providers: [IngredientService],
  exports: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {}
