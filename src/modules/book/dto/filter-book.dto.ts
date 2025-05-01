import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterBookDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  isbn: string;

  @ApiPropertyOptional()
  year: string;

  @ApiPropertyOptional()
  author: string;
}
