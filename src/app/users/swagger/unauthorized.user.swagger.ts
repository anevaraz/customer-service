import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedUserSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
