import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) private repository: Repository<Team>) {}

  async find(): Promise<Team[]> {
    return this.repository.find({ relations: ['members'] });
  }

  async findById(id: number): Promise<Team> {
    return this.repository.findOne(id, { relations: ['members'] });
  }

  async save(item: DeepPartial<Team>): Promise<Team> {
    return this.repository.save(this.repository.create(item));
  }

  async update(id: number, item: DeepPartial<Team>): Promise<Team> {
    return this.repository.save({
      ...(await this.repository.findOne(id)),
      ...item,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}
