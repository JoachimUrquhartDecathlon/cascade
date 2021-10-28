import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TeamMemberModule } from '../team-member/team-member.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TeamMemberModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
