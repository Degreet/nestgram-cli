export class Logger {
  log(...texts: string[]) {
    console.log(...texts);
  }

  success(...texts: string[]) {
    this.log(`[NestGram]`.green, ...texts);
  }

  info(...texts: string[]) {
    this.log(`[NestGram]`.blue, ...texts);
  }
}

export const logger: Logger = new Logger();
