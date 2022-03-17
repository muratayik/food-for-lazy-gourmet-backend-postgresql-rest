import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.model';
import { MealService } from 'src/meal/meal.service';
import { Favourite } from './favourite.entity';
import { FavouriteRepository } from './favourite.repository';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(FavouriteRepository)
    private favouriteRepository: FavouriteRepository,
    private mealService: MealService,
  ) {}

  async getAllFavourites(): Promise<Favourite[]> {
    return await this.favouriteRepository.find();
  }

  async getFavourites(user: User): Promise<Favourite> {
    const { id: userId } = user;
    return await this.favouriteRepository.findOne({ userId });
  }

  async addToFavourites(user: User, mealId: string): Promise<Favourite> {
    await this.mealService.getMeal(mealId);
    try {
      const { id: userId } = user;
      const favourite = await this.favouriteRepository.findOne({ userId });

      if (!favourite) {
        const newFavourite = this.favouriteRepository.create({
          userId,
          favouriteMealIdList: [mealId],
        });

        await this.favouriteRepository.save(newFavourite);
        return newFavourite;
      }

      const isMealAlreadyInList =
        favourite.favouriteMealIdList.includes(mealId);

      if (isMealAlreadyInList) {
        return favourite;
      }

      favourite.favouriteMealIdList.push(mealId);
      await this.favouriteRepository.save(favourite);
      return favourite;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeFromFavourites(user: User, mealId: string): Promise<void> {
    try {
      const { id: userId } = user;
      const favourite = await this.favouriteRepository.findOne({ userId });

      if (!favourite) return;

      const mealIdIndexInFavouritesList =
        favourite.favouriteMealIdList.indexOf(mealId);

      if (mealIdIndexInFavouritesList < 0) return;

      favourite.favouriteMealIdList.splice(mealIdIndexInFavouritesList, 1);
      await this.favouriteRepository.save(favourite);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
