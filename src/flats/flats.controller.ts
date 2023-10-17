import { Body, Controller, Get, Post } from '@nestjs/common';

import { FlatsService } from './flats.service';
import { CreateFlatRequestDto } from './dto/request/create-flat-request.dto';
import { GetFlatResponseDto } from './dto/response/get-flat-response.dto';

@Controller('flats')
export class FlatsController {
  constructor(private readonly flatsService: FlatsService) {}

  @Post()
  async createFlat(
    @Body() createFlatRequest: CreateFlatRequestDto,
  ): Promise<GetFlatResponseDto> {
    return this.flatsService.createFlat(createFlatRequest);
  }

  @Get()
  async getAll(): Promise<GetFlatResponseDto[]> {
    return this.flatsService.findAll();
  }
}
