import { NestGram } from 'nestgram';
import { AppModule } from './app.module';
import config from 'config';

async function bootstrap(): Promise<void> {
  const bot: NestGram = new NestGram(config.get<string>('botToken'), AppModule);
  await bot.start();
}

bootstrap();
