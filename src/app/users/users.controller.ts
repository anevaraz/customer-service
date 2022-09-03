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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatusEnum } from './enum/user-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('v1/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAllByStatus(@Query() query: QueryUserDto) {
    return this.usersService.findAllByStatus(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOneOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneByOrFail({
      id,
      status: UserStatusEnum.ACTIVE,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deactivate(id);
  }
}
