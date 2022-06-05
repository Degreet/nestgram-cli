import { Module } from 'nestgram';
import { AppController } from './controller';
import { AppService } from './service';

@Module({
  controllers: [AppController],
  services: [AppService],
})
export class AppModule {}
