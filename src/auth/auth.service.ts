import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { LoginUserRequestDto } from 'src/users/dto/request/login-user-request.dto';
import { GetUserResponseDto } from 'src/users/dto/response/get-user-response.dto';
import { TokenPayload } from './interfaces/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(
    loginUserRequest: LoginUserRequestDto,
  ): Promise<GetUserResponseDto> {
    const { email, password } = loginUserRequest;

    const user = await this.usersService.validateUser(email, password);

    const access_token = await this.generateAccessToken(user);

    return {
      ...user,
      access_token,
    };
  }

  async generateAccessToken(user: GetUserResponseDto): Promise<string> {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
