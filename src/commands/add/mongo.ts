import * as inquirer from 'inquirer';
import { logger } from '../../utils/logger';
import { exec } from '../../utils/exec';

import * as fs from 'fs-extra';
import * as path from 'path';

export async function addMongoModule() {
  const uriPrompt: any = await inquirer.prompt({
    name: 'Enter mongo uri',
  });

  const uri: string = uriPrompt['Enter mongo uri'];

  logger.success('Installing', '@nestgram/mongo'.grey, 'and', 'mongoose'.grey + '...');
  await exec('yarn add @nestgram/mongo mongoose && yarn add @types/mongoose -D');

  logger.success('Applying changes...');

  try {
    const appModulePath: string = path.resolve(process.cwd(), 'src', 'app.module.ts');
    let text: string = (await fs.readFile(appModulePath)).toString();

    if (text.includes('modules: [')) {
      let replaceValue: string = `modules: [UseMongoConnection('${uri}')`;

      if (text.match(/modules: \[.*?,]/)) {
        replaceValue += ', ';
      }

      text = text.replace('modules: [', replaceValue);
    } else {
      text = text.replace('@Module({', `@Module({\n  modules: [UseMongoConnection('${uri}')],`);
    }

    text = `import { UseMongoConnection } from '@nestgram/mongo'\n${text}`;

    await fs.writeFile(appModulePath, text);
    logger.success('Module added!');
  } catch (e: any) {
    logger.realError(e);

    logger.error(
      'Failed to apply module. Check your app.module.ts file. It must be in the root of src folder',
    );
  }
}
