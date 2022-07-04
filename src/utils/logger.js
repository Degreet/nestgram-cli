class Logger {
  log(...texts) {
    console.log(...texts);
  }

  success(...texts) {
    this.log(`[NestGram CLI]`.green, ...texts);
  }

  info(...texts) {
    this.log(`[NestGram CLI]`.blue, ...texts);
  }

  error(...texts) {
    this.log(`[NestGram CLI]`.red, ...texts);
  }

  realError(...texts) {
    this.log(`\n[RealError]`.bgRed, ...texts, `\n`);
  }
}

const logger = new Logger();
module.exports = { Logger, logger };
