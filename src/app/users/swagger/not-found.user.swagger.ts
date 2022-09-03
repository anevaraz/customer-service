import { ApiProperty } from '@nestjs/swagger';

export class NotFoundUserSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
