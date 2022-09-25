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
  DefaultValuePipe,
  ParseIntPipe,
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
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseUserSwagger } from '../../helpers/swagger/response.user.swagger';
import { ResponsePaginateUserSwagger } from '../../helpers/swagger/response.paginate.user.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { UnauthorizedSwagger } from '../../helpers/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';
import { ForbiddenUserSwagger } from '../../helpers/swagger/forbidden.user.swagger';
import { UserEntity } from './entities/users.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('v1/user')
@ApiTags('Users')
@ApiSecurity('apiKey')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({ status: 201, type: ResponseUserSwagger })
  @ApiResponse({ status: 400, type: BadRequestSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'find all users' })
  @ApiResponse({
    status: 200,
    type: ResponsePaginateUserSwagger,
  })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<UserEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.usersService.paginate({
      page,
      limit,
      route: '/user',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'find user by UUID' })
  @ApiResponse({ status: 200, type: ResponseUserSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 403, type: ForbiddenUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  findOneOrFail(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
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
  @ApiResponse({ status: 403, type: ForbiddenUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'deactivate user account by UUID' })
  @ApiResponse({ status: 200, description: 'deactivated user account' })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 403, type: ForbiddenUserSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  deactivate(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.usersService.deactivate(id);
    return;
  }
}
