import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { TeamMemberService } from '../team-member/team-member.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private teamMemberService: TeamMemberService,
  ) {}

  async find(): Promise<User[]> {
    return this.userRepository.find({ relations: ['teams', 'teams.team'] });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      relations: ['teams', 'teams.team'],
    });
  }

  async save(item: DeepPartial<User>): Promise<User> {
    return this.userRepository.save(this.userRepository.create(item));
  }

  async update(id: number, item: DeepPartial<User>): Promise<User> {
    const { teams, ...user } = item;
    const promises: Promise<any>[] = [];
    if (Object.keys(user).length > 0) {
      promises.push(this.userRepository.update(id, user));
    }
    if (teams?.length > 0) {
      promises.push(this.teamMemberService.save(teams));
    }

    await Promise.all(promises);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    return;
  }
}
