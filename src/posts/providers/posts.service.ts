import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaoptiOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    let post = this.postRepository.create(createPostDto);

    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    let posts = await this.postRepository.find({
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
