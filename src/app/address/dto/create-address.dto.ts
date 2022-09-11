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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AddressStateEnum)
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(new RegExp(RegexHelper.POSTCODE), {
    message: MessagesHelper.PASSWORD_VALID,
  })
  postcode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  default: number;

  user: UserEntity;
}
