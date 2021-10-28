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
import { CreateUser, UpdateUser, User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  find(): Promise<User[]> {
    return this.service.find();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<User> {
    return this.service.findById(id);
  }

  @Post()
  save(@Body() item: CreateUser): Promise<User> {
    return this.service.save(item);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() item: UpdateUser): Promise<User> {
    return this.service.update(id, item);
  }
}
