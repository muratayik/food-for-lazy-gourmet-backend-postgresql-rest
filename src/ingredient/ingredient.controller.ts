import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  getIngredients() {
    return this.ingredientService.getIngredients();
  }
}
