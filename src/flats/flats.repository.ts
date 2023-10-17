import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Flat } from './entities/flat.entity';
import { CreateFlatRequestDto } from './dto/request/create-flat-request.dto';

@Injectable()
export class FlatsRepository {
  constructor(
    @InjectRepository(Flat)
    private flatsRepository: Repository<Flat>,
  ) {}

  create(flat: CreateFlatRequestDto) {
    return this.flatsRepository.save(flat);
  }

  findOneById(id: string) {
    return this.flatsRepository.findOneBy({ id });
  }

  findAll() {
    return this.flatsRepository.find();
  }
}
