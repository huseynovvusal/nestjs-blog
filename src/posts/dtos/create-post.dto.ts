import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import PostType from '../enums/postType.enum';
import StatusType from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-metaoptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Description',
    example: 'Example',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({
    enum: PostType,
    description: "Possible values  'post', 'page', 'story', 'series'",
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: "For example 'my-url'",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Invalid Slug',
  })
  slug: string;

  @ApiProperty({
    enum: StatusType,
    description: "Possible values 'draft', 'scheduled', 'review', 'published'",
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;

  @ApiPropertyOptional({
    description: 'Description',
    example: 'Example',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'Must be a valid timestamp in ISO8601',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional()
  @IsArray()
  @IsNotEmpty()
  @MinLength(3, { each: true })
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',

      properties: {
        metaValue: {
          type: 'string',
          example: '{"key":"value"}',
        },
      },
    },
  })
  @IsOptional()
  metaOptions?: CreatePostMetaOptionsDto | null;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
