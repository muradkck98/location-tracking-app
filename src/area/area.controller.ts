import { Controller, Post, Body, Get } from '@nestjs/common';
import { AreaService } from './area.service';
import { Polygon } from 'geojson';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async createArea(@Body() body: { name: string; coordinates: number[][][] }) {
    const polygon: Polygon = {
      type: 'Polygon',
      coordinates: body.coordinates,
    };
    await this.areaService.addArea(body.name, polygon);
    return { message: 'Area added.' };
  }

  @Get()
  async listAreas() {
    return this.areaService.getAreas();
  }
}