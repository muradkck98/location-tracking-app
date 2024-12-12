import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from '../entities/area.entity';
import { Polygon } from 'geojson';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area) private readonly areaRepo: Repository<Area>,
  ) {}

  async addArea(name: string, polygon: Polygon): Promise<void> {
    await this.areaRepo.save({ name, geom: polygon });
  }

  async getAreas(): Promise<Area[]> {
    return this.areaRepo.find();
  }

  async findIntersectingAreas(point: string): Promise<Area[]> {
    return this.areaRepo
      .createQueryBuilder('area')
      .where('ST_Intersects(area.geom, ST_SetSRID(ST_GeomFromGeoJSON(:point), 4326))', { point })
      .getMany();
  }
}