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

  realError(...texts: string[]) {
    this.log(`\n[RealError]`.bgRed, ...texts, `\n`);
  }
}

export const logger: Logger = new Logger();
