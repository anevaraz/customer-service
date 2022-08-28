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
import { CustomerGenderEnum } from '../enum/customer-gender.enum';
import { CustomerTypeEnum } from '../enum/customer-type.enum';
import { CustomerValidationRegex } from '../regex/customer-validation.regex';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsEnum([CustomerTypeEnum.PERSON, CustomerTypeEnum.COMPANY])
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
  @Matches(new RegExp(CustomerValidationRegex.DATE_OF_BIRTH))
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum([CustomerGenderEnum.FEMALE, CustomerGenderEnum.MALE])
  gender?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber?: string;
}
