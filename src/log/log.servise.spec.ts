import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';

describe('LogService', () => {
  let service: LogService;

  const mockLogRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogService,
        { provide: getRepositoryToken(Log), useValue: mockLogRepository },
      ],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should save a log', async () => {
    await service.createLog('user123', 1);
    expect(mockLogRepository.save).toHaveBeenCalledWith({
      userId: 'user123',
      areaId: 1,
    });
  });

  it('should return all logs', async () => {
    const logs = [{ id: 1, userId: 'user123', areaId: 1, timestamp: new Date() }];
    mockLogRepository.find.mockResolvedValueOnce(logs);

    const result = await service.getLogs();
    expect(result).toEqual(logs);
  });
});
