import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { ResponseAddressSwagger } from '../../helpers/swagger/response.address.swagger';
import { UnauthorizedSwagger } from '../../helpers/swagger/unauthorized.swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('v1/address')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Address')
@ApiSecurity('apiKey')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'create a new address' })
  @ApiResponse({ status: 201, type: ResponseAddressSwagger })
  @ApiResponse({ status: 400, type: BadRequestSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    const user = req.user.id;
    return this.addressService.create(user, createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'find all addresses by user' })
  @ApiResponse({ status: 200, type: ResponseAddressSwagger, isArray: true })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  findAllByUser(@Req() req: any) {
    const user = req.user.id;
    return this.addressService.findAllByUser(user);
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'find address by UUID' })
  @ApiResponse({ status: 200, type: ResponseAddressSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  findOneByOrFail(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.addressService.findOneByOrFail({ id });
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'update address by UUID' })
  @ApiResponse({ status: 200, type: ResponseAddressSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'delete address by UUID' })
  @ApiResponse({ status: 200, description: 'deleted address' })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  @ApiResponse({ status: 404, type: NotFoundSwagger })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.addressService.remove(id);
  }
}
