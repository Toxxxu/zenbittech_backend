import { Injectable } from '@nestjs/common';

import { FlatsRepository } from './flats.repository';
import { CreateFlatRequestDto } from './dto/request/create-flat-request.dto';
import { GetFlatResponseDto } from './dto/response/get-flat-response.dto';
import { Flat } from './entities/flat.entity';

@Injectable()
export class FlatsService {
  constructor(private readonly flatsRepository: FlatsRepository) {}

  async createFlat(
    createFlatRequest: CreateFlatRequestDto,
  ): Promise<GetFlatResponseDto> {
    const flat = await this.flatsRepository.create(createFlatRequest);
    return this.buildResponse(flat);
  }

  async findAll(): Promise<GetFlatResponseDto[]> {
    const flats = await this.flatsRepository.findAll();
    return flats.map((flat) => this.buildResponse(flat));
  }

  private buildResponse(flat: Flat): GetFlatResponseDto {
    return {
      id: flat.id.toString(),
      title: flat.title,
      image_url: flat.image_url,
      price: flat.price,
      yield: flat.yield,
      sold: flat.sold,
      ticket: flat.ticket,
      days_left: flat.days_left,
    };
  }
}
