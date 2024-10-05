import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

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
    const isAuth = this.authService.isAuth();

    console.log(isAuth);

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
