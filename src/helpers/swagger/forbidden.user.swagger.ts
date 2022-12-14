import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenUserSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
