import { NestGram } from 'nestgram';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const bot: NestGram = new NestGram('BOT@TOKEN', AppModule);
  await bot.start();
}

bootstrap();
