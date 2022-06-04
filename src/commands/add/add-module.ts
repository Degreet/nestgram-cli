import { logger } from '../../utils/logger';
import { addMongoModule } from './mongo';
import * as inquirer from 'inquirer';

export async function addModule() {
  const title: string = 'Module name';

  const moduleNamePrompt: any = await inquirer.prompt([
    { name: title, choices: ['Mongo'], type: 'list' },
  ]);

  const moduleName: string = moduleNamePrompt[title];

  if (moduleName === 'Mongo') {
    await addMongoModule();
  } else {
    logger.error(`No module named`, moduleName);
  }
}
