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
import { UserGenderEnum } from '../enum/user-gender.enum';
import { UserTypeEnum } from '../enum/user-type.enum';
import { UserValidationRegex } from '../regex/user-validation.regex';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEnum([UserTypeEnum.PERSON, UserTypeEnum.COMPANY])
  type: string;

  @IsNotEmpty()
  @Length(11, 14)
  @IsNumberString()
  documentNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(6, 100)
  email: string;

  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @IsNotEmpty()
  @Length(3, 100)
  lastName: string;

  @IsOptional()
  @Matches(new RegExp(UserValidationRegex.DATE_OF_BIRTH))
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum([UserGenderEnum.FEMALE, UserGenderEnum.MALE])
  gender?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber?: string;
}
