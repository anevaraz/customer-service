import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUserDto {
  @ApiPropertyOptional()
  status?: number;
}
