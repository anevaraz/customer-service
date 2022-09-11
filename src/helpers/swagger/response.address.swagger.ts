import { ApiProperty } from '@nestjs/swagger';

export class ResponseAddressSwagger {
  @ApiProperty()
  address: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  district: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  default: number;
}
