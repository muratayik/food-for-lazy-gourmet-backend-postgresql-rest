import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository])],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
