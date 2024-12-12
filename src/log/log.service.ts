import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log) private readonly logRepo: Repository<Log>,
  ) {}

  async createLog(userId: string, areaId: number): Promise<void> {
    await this.logRepo.save({ userId, areaId });
  }

  async getLogs(): Promise<Log[]> {
    return this.logRepo.find();
  }
}