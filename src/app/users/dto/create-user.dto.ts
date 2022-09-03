import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
} from 'class-validator';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { RegexHelper } from '../../../helpers/regex.helper';
import { UserGenderEnum } from '../enum/user-gender.enum';
import { UserTypeEnum } from '../enum/user-type.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum([UserTypeEnum.PERSON, UserTypeEnum.COMPANY])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(11, 14)
  @IsNumberString()
  documentNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(new RegExp(RegexHelper.PASSWORD), {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(new RegExp(RegexHelper.DATE_OF_BIRTH))
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum([UserGenderEnum.FEMALE, UserGenderEnum.MALE])
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber?: string;
}
