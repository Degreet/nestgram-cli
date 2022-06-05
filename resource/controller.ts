import { Controller } from 'nestgram';
import { AppService } from './service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
