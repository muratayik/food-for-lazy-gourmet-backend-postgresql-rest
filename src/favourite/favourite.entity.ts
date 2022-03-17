import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Favourite {
  @PrimaryColumn()
  userId: string;

  @Column('text', { array: true })
  favouriteMealIdList: string[];
}
