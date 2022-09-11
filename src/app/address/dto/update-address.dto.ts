import { IsEnum, IsNumber, IsOptional, Length, Matches } from 'class-validator';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { RegexHelper } from '../../../helpers/regex.helper';
import { AddressStateEnum } from '../enum/address.state.enum';

export class UpdateAddressDto {
  @IsOptional()
  @Length(3, 100)
  address: string;

  @IsOptional()
  @IsNumber()
  number: number;

  @IsOptional()
  @Length(3, 100)
  complement: string;

  @IsOptional()
  @Length(3, 100)
  district: string;

  @IsOptional()
  @Length(3, 100)
  city: string;

  @IsOptional()
  @IsEnum(AddressStateEnum)
  state: string;

  @IsOptional()
  @Matches(new RegExp(RegexHelper.POSTCODE), {
    message: MessagesHelper.PASSWORD_VALID,
  })
  postcode: string;

  @IsOptional()
  @IsNumber()
  default: number;
}
