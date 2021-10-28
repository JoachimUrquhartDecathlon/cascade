import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { TeamMemberModule } from './team-member/team-member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'cascade',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    TeamModule,
    UserModule,
    TeamMemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
