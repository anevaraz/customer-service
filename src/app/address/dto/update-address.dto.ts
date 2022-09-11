import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Length, Matches } from 'class-validator';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { RegexHelper } from '../../../helpers/regex.helper';
import { AddressStateEnum } from '../enum/address.state.enum';

export class UpdateAddressDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  number: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  complement: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  district: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AddressStateEnum)
  state: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(new RegExp(RegexHelper.POSTCODE), {
    message: MessagesHelper.PASSWORD_VALID,
  })
  postcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  default: number;
}
