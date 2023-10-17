import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    createUserRequest: CreateUserRequestDto,
  ): Promise<GetUserResponseDto> {
    await this.validateCreateUserRequest(createUserRequest);
    const user = await this.usersRepository.create({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10),
    });
    return this.buildResponse(user);
  }

  private async validateCreateUserRequest(
    createUserRequest: CreateUserRequestDto,
  ): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(
      createUserRequest.email,
    );
    if (user) {
      throw new BadRequestException('This email already exists.');
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<GetUserResponseDto> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User does not exist by email '${email}'.`);
    }
    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are invalid.');
    }
    return this.buildResponse(user);
  }

  async getUserById(userId: string): Promise<GetUserResponseDto> {
    const user = await this.usersRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`User not found by id: '${userId}'.`);
    }
    return this.buildResponse(user);
  }

  private buildResponse(user: User): GetUserResponseDto {
    return {
      id: user.id.toString(),
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
