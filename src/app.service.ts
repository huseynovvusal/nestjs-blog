import { Injectable } from '@nestjs/common';

/**
 * Class to doing something
 */
@Injectable()
export class AppService {
  /**
   * Function
   */
  getHello(): string {
    return 'Hello NestJS!';
  }
}
