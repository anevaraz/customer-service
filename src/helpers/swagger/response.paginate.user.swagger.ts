import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../app/users/entities/users.entity';
import { ResponseUserSwagger } from './response.user.swagger';

class Meta {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

class Links {
  @ApiProperty()
  first: string;

  @ApiProperty()
  previous: string;

  @ApiProperty()
  next: string;

  @ApiProperty()
  last: string;
}

export class ResponsePaginateUserSwagger {
  @ApiProperty({ type: ResponseUserSwagger, isArray: true })
  items: UserEntity[];

  @ApiProperty()
  meta: Meta;

  @ApiProperty()
  links: Links;
}
