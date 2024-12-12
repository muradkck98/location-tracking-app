import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'geojson';
import { Location } from '../entities/location.entity';
import { AreaService } from '../area/area.service';
import { LogService } from '../log/log.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly locationRepo: Repository<Location>,
    private readonly areaService: AreaService,
    private readonly logService: LogService,
  ) {}

  async logLocation(userId: string, point: Point): Promise<void> {
    await this.locationRepo.save({ userId, geom: point });

    const areas = await this.areaService.findIntersectingAreas(JSON.stringify(point));
    for (const area of areas) {
      await this.logService.createLog(userId, area.id);
    }
  }
}
