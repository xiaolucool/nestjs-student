import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './public/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hello World!')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
