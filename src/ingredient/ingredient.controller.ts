import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getIngredients();
  }

  @Get('/:id')
  getIngredient(id: string): Promise<Ingredient> {
    return this.ingredientService.getIngredient(id);
  }

  @Get('/getByMealId/:mealId')
  getIngredientByMealId(
    @Param('mealId') mealId: string,
  ): Promise<Ingredient[]> {
    return this.ingredientService.getIngredientByMealId(mealId);
  }

  @Post()
  createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Patch()
  updateIngredient(
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(updateIngredientDto);
  }

  @Delete('/:id')
  deleteIngredient(@Param('id') id: string): Promise<void> {
    return this.ingredientService.deleteIngredient(id);
  }
}
