import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { TeamMember } from '../team-member/team-member.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty({
    type: TeamMember,
    isArray: true,
  })
  @OneToMany(() => TeamMember, (teamMember) => teamMember.user, {
    cascade: true,
  })
  teams: TeamMember[];
}

export class CreateUser extends OmitType(User, ['id'] as const) {}
export class UpdateUser extends PartialType(OmitType(User, ['id'] as const)) {}
