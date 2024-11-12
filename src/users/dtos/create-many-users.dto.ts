import { CreateUserDto } from './create-user.dto';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
      },
    },
  })
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
