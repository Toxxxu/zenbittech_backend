import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @IsEmail({}, { message: 'Write correct email' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
