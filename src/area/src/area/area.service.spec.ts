import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Area } from '../entities/area.entity';
import { Repository } from 'typeorm';

describe('AreaService', () => {
  let service: AreaService;
  let repo: Repository<Area>;

  const mockAreaRepository = {
    save: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AreaService,
        { provide: getRepositoryToken(Area), useValue: mockAreaRepository },
      ],
    }).compile();

    service = module.get<AreaService>(AreaService);
    repo = module.get<Repository<Area>>(getRepositoryToken(Area));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new area', async () => {
    const createAreaDto = {
      name: 'Test Area',
      polygon: {
        type: 'Polygon',
        coordinates: [[[0, 0], [1, 1], [1, 0], [0, 0]]],
      },
    };

    await service.addArea(createAreaDto.name, createAreaDto.polygon);

    expect(mockAreaRepository.save).toHaveBeenCalledWith({
      name: createAreaDto.name,
      geom: createAreaDto.polygon,
    });
  });

  it('should get all areas', async () => {
    const areas = [{ id: 1, name: 'Area 1', geom: {} }];
    mockAreaRepository.find.mockResolvedValue(areas);

    const result = await service.getAreas();
    expect(result).toEqual(areas);
    expect(mockAreaRepository.find).toHaveBeenCalled();
  });
});
