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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { ResponseUserSwagger } from '../../helpers/swagger/response.user.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { UnauthorizedSwagger } from '../../helpers/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';

@Controller('v1/user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({ status: 201, type: ResponseUserSwagger })
  @ApiResponse({ status: 400, type: BadRequestSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'find all users by status (default `active`)' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger, isArray: true })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  findAllByStatus(@Query('status') query: QueryUserDto) {
    return this.usersService.findAllByStatus(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'find user by UUID' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  findOneOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneByOrFail({
      id,
      status: UserStatusEnum.ACTIVE,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'update user info by UUID' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'deactivate user account by UUID' })
  @ApiResponse({ status: 200, description: 'deactivated user account' })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    this.usersService.deactivate(id);
    return;
  }
}
