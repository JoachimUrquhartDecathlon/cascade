import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeam, Team, UpdateTeam } from './entities/team.entity';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private service: TeamService) {}

  @Get()
  find(): Promise<Team[]> {
    return this.service.find();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Team> {
    return this.service.findById(id);
  }

  @Post()
  save(@Body() item: CreateTeam): Promise<Team> {
    return this.service.save(item);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() item: UpdateTeam): Promise<Team> {
    return this.service.update(id, item);
  }
}
