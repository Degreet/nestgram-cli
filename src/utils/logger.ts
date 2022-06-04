export class Logger {
  log(...texts: string[]) {
    console.log(...texts);
  }

  success(...texts: string[]) {
    this.log(`[NestGram CLI]`.green, ...texts);
  }

  info(...texts: string[]) {
    this.log(`[NestGram CLI]`.blue, ...texts);
  }

  error(...texts: string[]) {
    this.log(`[NestGram CLI]`.red, ...texts);
  }
}

export const logger: Logger = new Logger();
