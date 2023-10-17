import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlatRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  yield: number;

  @IsNumber()
  @IsNotEmpty()
  sold: number;

  @IsNumber()
  @IsNotEmpty()
  ticket: number;

  @IsNumber()
  @IsNotEmpty()
  days_left: number;
}
