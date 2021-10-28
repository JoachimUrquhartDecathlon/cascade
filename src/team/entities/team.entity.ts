import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { TeamMember } from '../../team-member/team-member.entity';

@Entity()
export class Team {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({
    type: TeamMember,
    isArray: true,
  })
  @OneToMany(() => TeamMember, (member) => member.team, { cascade: true })
  members?: TeamMember[];
}

export class CreateTeam extends OmitType(Team, ['id'] as const) {}
export class UpdateTeam extends PartialType(OmitType(Team, ['id'] as const)) {}
