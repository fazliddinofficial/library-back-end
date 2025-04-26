import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bookNumber: number;

  @ApiProperty()
  bookType: string;

  @ApiProperty()
  languageType: string;

  @ApiProperty()
  createdYear: number;

  @ApiProperty()
  madeBy: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  bookPage: number;

  @ApiProperty()
  digitizationDate: Date;

  @ApiProperty()
  digitizationBy: string;
}
