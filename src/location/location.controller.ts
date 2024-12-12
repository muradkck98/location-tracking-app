import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { Point } from 'geojson';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async postLocation(@Body() body: { userId: string; latitude: number; longitude: number }) {
    const point: Point = {
      type: 'Point',
      coordinates: [body.longitude, body.latitude],
    };
    await this.locationService.logLocation(body.userId, point);
    return { message: 'Location processed.' };
  }
}
