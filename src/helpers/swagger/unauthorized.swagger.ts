import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
