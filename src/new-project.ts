import { info, success } from './logger';
import * as fs from 'fs-extra';
import * as path from 'path';

import { promisify } from 'util';
import { exec as execSync } from 'child_process';
const exec = promisify(execSync);

export async function createNewProject(name: string): Promise<void> {
  const destPath: string = path.resolve(process.cwd(), name);

  success('Creating new project into', name.grey);
  await fs.copy(path.resolve(__dirname, '..', 'template'), destPath);

  success('Installing dependencies...');
  await exec(`yarn --cwd ${destPath}`);

  success('Project created!');
  info('Run project'.grey, `cd ${name} && npm start`);
}
