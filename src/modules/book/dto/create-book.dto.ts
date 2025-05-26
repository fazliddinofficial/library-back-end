import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  bookType: string;

  @ApiProperty()
  languageType: string;

  @IsNotEmpty()
  @ApiProperty()
  inventarNumber: string;

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
