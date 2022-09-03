import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserSwagger {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  documentNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updateAt: string;
}
