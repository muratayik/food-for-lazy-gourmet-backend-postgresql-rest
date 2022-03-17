import { Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.model';
import { FavouriteService } from './favourite.service';

@Controller('favourite')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Get('/all')
  getAllFavourites() {
    return this.favouriteService.getAllFavourites();
  }

  @Get()
  getFavourites(@GetUser() user: User) {
    return this.favouriteService.getFavourites(user);
  }

  @Post('/add/:mealId')
  addToFavourites(@GetUser() user: User, @Param('mealId') mealId: string) {
    return this.favouriteService.addToFavourites(user, mealId);
  }

  @Post('/remove/:mealId')
  removeFromFavourites(@GetUser() user: User, @Param('mealId') mealId: string) {
    return this.favouriteService.removeFromFavourites(user, mealId);
  }
}
