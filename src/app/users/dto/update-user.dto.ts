import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 20)
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 100)
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(new RegExp(RegexHelper.DATE_OF_BIRTH), {
    message: MessagesHelper.DATE_OF_BIRTH_VALID,
  })
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
