import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_url: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  yield: string;

  @Column()
  sold: number;

  @Column()
  ticket: number;

  @Column()
  days_left: number;
}
