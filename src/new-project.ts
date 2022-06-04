import { logger } from './utils/logger';
import { exec } from './utils/exec';

import * as fs from 'fs-extra';
import * as path from 'path';

export async function createNewProject(name: string): Promise<void> {
  const destPath: string = path.resolve(process.cwd(), name);

  logger.success('Creating new project into', name.grey);
  await fs.copy(path.resolve(__dirname, '..', 'template'), destPath);

  logger.success('Installing dependencies...');
  await exec(`yarn --cwd ${destPath}`);

  logger.success('Project created!');
  logger.info('Run project'.grey, `cd ${name} && npm start`);
}
