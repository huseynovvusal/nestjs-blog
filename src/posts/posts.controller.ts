import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from 'src/tags/dto/get-posts.dto';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { IActiveUser } from '../auth/interfaces/active-user.interface';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery);
    return this.postsService.findAll(postQuery);
  }

  @ApiOperation({
    summary: 'Create Post',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Update Post',
  })
  @ApiResponse({
    status: 200,
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
