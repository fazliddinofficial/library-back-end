import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsString({ message: 'Full name must be a string' })
  fullName: string;

  @ApiProperty()
  @IsString({ message: 'Email must be a string' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  password: string;
}
