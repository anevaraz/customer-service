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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('v1/address')
@UseGuards(AuthGuard('jwt'))
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    const user = req.user.id;
    return this.addressService.create(user, createAddressDto);
  }

  @Get()
  findAllByUser(@Req() req: any) {
    const user = req.user.id;
    return this.addressService.findAllByUser(user);
  }

  @Get(':id')
  findOneByOrFail(@Param('id') id: string) {
    return this.addressService.findOneByOrFail({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
