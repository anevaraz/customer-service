import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
} from 'class-validator';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { RegexHelper } from '../../../helpers/regex.helper';
import { UserGenderEnum } from '../enum/user-gender.enum';
export class UpdateUserDto {
  @IsOptional()
  @Length(3, 20)
  firstName?: string;

  @IsOptional()
  @Length(3, 100)
  lastName?: string;

  @IsOptional()
  @Matches(new RegExp(RegexHelper.DATE_OF_BIRTH), {
    message: MessagesHelper.DATE_OF_BIRTH_VALID,
  })
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum([UserGenderEnum.FEMALE, UserGenderEnum.MALE])
  gender?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber?: string;
}
