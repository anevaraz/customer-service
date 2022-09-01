import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAllByStatus(@Query('status') status: number) {
    return this.usersService.findAllByStatus(status);
  }

  @Get(':id')
  findOneOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneOrFail(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deactivate(id);
  }
}
