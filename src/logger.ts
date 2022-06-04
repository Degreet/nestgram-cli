export function success(...texts: string[]) {
  console.log(`[NestGram]`.green, ...texts);
}

export function info(...texts: string[]) {
  console.log(`[NestGram]`.blue, ...texts);
}
