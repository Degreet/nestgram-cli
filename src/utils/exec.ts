import { exec as execSync } from 'child_process';
import { promisify } from 'util';
export const exec: Function = promisify(execSync);
