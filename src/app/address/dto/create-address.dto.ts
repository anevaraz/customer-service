import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { RegexHelper } from '../../../helpers/regex.helper';
import { UserEntity } from '../../../app/users/entities/users.entity';
import { AddressStateEnum } from '../enum/address.state.enum';
import { MessagesHelper } from '../../../helpers/messages.helper';

export class CreateAddressDto {
  @IsNotEmpty()
  @Length(3, 100)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsOptional()
  @Length(3, 100)
  complement: string;

  @IsNotEmpty()
  @Length(3, 100)
  district: string;

  @IsNotEmpty()
  @Length(3, 100)
  city: string;

  @IsNotEmpty()
  @IsEnum(AddressStateEnum)
  state: string;

  @IsNotEmpty()
  @Matches(new RegExp(RegexHelper.POSTCODE), {
    message: MessagesHelper.PASSWORD_VALID,
  })
  postcode: string;

  @IsOptional()
  @IsNumber()
  default: number;

  user: UserEntity;
}
