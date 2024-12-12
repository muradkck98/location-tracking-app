import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from '../entities/location.entity';
import { AreaModule } from '../area/area.module';
import { LogModule } from '../log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), AreaModule, LogModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
