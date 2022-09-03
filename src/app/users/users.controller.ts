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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { ResponseUserSwagger } from './swagger/response.user.swagger';
import { ValidationUserSwagger } from './swagger/validation.user.swagger';
import { UnauthorizedUserSwagger } from './swagger/unauthorized.user.swagger';
import { NotFoundUserSwagger } from './swagger/not-found.user.swagger';

@Controller('v1/user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({ status: 201, type: ResponseUserSwagger })
  @ApiResponse({ status: 400, type: ValidationUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'find all users by status (default `active`)' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger, isArray: true })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  findAllByStatus(@Query('status') query: QueryUserDto) {
    return this.usersService.findAllByStatus(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'find user by UUID' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundUserSwagger })
  findOneOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneByOrFail({
      id,
      status: UserStatusEnum.ACTIVE,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'update user info by UUID' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundUserSwagger })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'deactivate user account by UUID' })
  @ApiResponse({ status: 200, description: 'no return value' })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundUserSwagger })
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    this.usersService.deactivate(id);
    return;
  }
}
