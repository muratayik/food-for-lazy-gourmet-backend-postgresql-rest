import { EntityRepository, Repository } from 'typeorm';
import { Favourite } from './favourite.entity';

@EntityRepository(Favourite)
export class FavouriteRepository extends Repository<Favourite> {}
