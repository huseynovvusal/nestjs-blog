import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaoptiOptionsRepository: Repository<MetaOption>,
    private readonly tagsService: TagsService,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    const author = await this.usersService.findOneById(createPostDto.authorId);

    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    const posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
