import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Class to doing something
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
