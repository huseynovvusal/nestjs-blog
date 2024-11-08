import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to doing something
 */
@Injectable()
export class UsersService {
  /**
   * Method to doing something
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      console.log(error);

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'User already exists, please check your email.',
      );
    }

    let newUser = this.userRepository.create(createUserDto);

    if (!existingUser) {
      newUser = await this.userRepository.save(newUser);
    }

    return newUser;
  }

  /**
   * Method to doing something
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(this.profileConfiguration);
    console.log(this.profileConfiguration.apiKey);

    // const isAuth = this.authService.isAuth();
    //
    // console.log(isAuth);

    return [
      {
        fistName: 'John',
        email: 'john@me.com',
      },
      {
        fistName: 'Alice',
        email: 'alice@me.com',
      },
    ];
  }

  /**
   * Method to doing something
   */
  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
