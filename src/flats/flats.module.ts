import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FlatsController } from './flats.controller';
import { FlatsService } from './flats.service';
import { Flat } from './entities/flat.entity';
import { FlatsRepository } from './flats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Flat])],
  controllers: [FlatsController],
  providers: [FlatsService, FlatsRepository],
})
export class FlatsModule {}
