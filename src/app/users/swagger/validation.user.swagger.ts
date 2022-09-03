import { ApiProperty } from '@nestjs/swagger';

export class ValidationUserSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
