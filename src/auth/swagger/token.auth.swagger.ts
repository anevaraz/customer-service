import { ApiProperty } from '@nestjs/swagger';

export class TokenAuhtSwagger {
  @ApiProperty()
  token: string;
}
