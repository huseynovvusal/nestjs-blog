import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from '../../users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { TagsService } from '../../tags/providers/tags.service';
import { IActiveUser } from '../../auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: IActiveUser) {
    let author = undefined;
    let tags = undefined;

    try {
      author = await this.usersService.findOneById(user.sub);

      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    console.log(tags);

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please, check your tag Ids');
    }

    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique',
      });
    }
  }
}
