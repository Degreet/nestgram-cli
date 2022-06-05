import { logger } from '../../utils/logger';
import { exec } from '../../utils/exec';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as inquirer from 'inquirer';

export async function createNewProject(name: string): Promise<void> {
  const tokenPrompt: any = await inquirer.prompt({
    name: 'Enter bot token',
  });

  const token: string = tokenPrompt['Enter bot token'];
  const destPath: string = path.resolve(process.cwd(), name);

  logger.success('Creating new project into', name.grey);
  await fs.copy(path.resolve(__dirname, '..', '..', '..', 'template'), destPath);

  logger.success('Installing dependencies...');
  await exec(`yarn --cwd ${destPath} && yarn add nestgram --cwd ${destPath}`);

  logger.success('Saving token...');
  await fs.writeFile(
    path.resolve(destPath, 'config', 'default.json'),
    `{\n  "botToken": "${token}"\n}`,
  );

  logger.success('Project created!');
  logger.info('Run project'.grey, `cd ${name} && npm start`);
}
