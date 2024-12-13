import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { AreaService } from '../area/area.service';
import { LogService } from '../log/log.service';

describe('LocationService', () => {
  let service: LocationService;

  const mockLocationRepository = {
    save: jest.fn(),
  };

  const mockAreaService = {
    findIntersectingAreas: jest.fn(),
  };

  const mockLogService = {
    createLog: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: getRepositoryToken(Location), useValue: mockLocationRepository },
        { provide: AreaService, useValue: mockAreaService },
        { provide: LogService, useValue: mockLogService },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log a location', async () => {
    const createLocationDto = {
      userId: 'user123',
      point: { type: 'Point', coordinates: [0.5, 0.5] },
    };

    const intersectingAreas = [{ id: 1 }, { id: 2 }];
    mockAreaService.findIntersectingAreas.mockResolvedValue(intersectingAreas);

    await service.logLocation(createLocationDto.userId, createLocationDto.point);

    expect(mockLocationRepository.save).toHaveBeenCalledWith({
      userId: 'user123',
      geom: createLocationDto.point,
    });
    expect(mockLogService.createLog).toHaveBeenCalledWith('user123', 1);
    expect(mockLogService.createLog).toHaveBeenCalledWith('user123', 2);
  });
});
