import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../shared/entities/base.entity';
import { User } from '../user/user.entity';
import { Team } from '../team/entities/team.entity';

@Entity()
export class TeamMember extends BaseEntity {
  @ApiProperty({
    type: User,
  })
  @ManyToOne(() => User, (user) => user.teams, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty()
  @Column()
  role: string;

  @ApiProperty({
    type: Team,
  })
  @ManyToOne(() => Team, (team) => team.members, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  team: Team;
}
