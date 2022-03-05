import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { CreateMealDto } from 'src/dto/create-meal.dto';
import { UpdateMealDto } from 'src/dto/update-meal.dto';
import { Meal } from 'src/meal/meal.entity';
import { UserMealService } from './user-meal.service';

@Controller('user-meal')
export class UserMealController {
  constructor(private userMealService: UserMealService) {}

  @Get()
  getMealsOfUser(@GetUser() user: User) {
    const { id: userId } = user;
    return this.userMealService.getMealsOfUser(userId);
  }

  @Post()
  createMeal(
    @GetUser() user: User,
    @Body() createMealDto: CreateMealDto,
  ): Promise<Meal> {
    const { id: userId } = user;
    return this.userMealService.createMeal(createMealDto, userId);
  }

  @Patch()
  updateMeal(
    @GetUser() user: User,
    @Body() updateMealDto: UpdateMealDto,
  ): Promise<Meal> {
    const { id: userId } = user;
    return this.userMealService.updateMeal(updateMealDto, userId);
  }

  @Delete('/:mealId')
  deleteMeal(
    @GetUser() user: User,
    @Param('mealId') mealId: string,
  ): Promise<void> {
    const { id: userId } = user;
    return this.userMealService.deleteMeal(userId, mealId);
  }
}
