import * as inquirer from 'inquirer';
import { logger } from '../../utils/logger';
import { exec } from '../../utils/exec';

import * as fs from 'fs-extra';
import * as path from 'path';
import { MONGO_MODULE_DOCS_LINK } from '../../constants';

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
      let replaceValue: string = `modules: [UseMongoConnection(config.get<string>('mongoUri'))`;

      if (text.match(/modules: \[.*?,]/)) {
        replaceValue += ', ';
      }

      text = text.replace('modules: [', replaceValue);
    } else {
      text = text.replace(
        '@Module({',
        `@Module({\n  modules: [UseMongoConnection(config.get<string>('mongoUri'))],`,
      );
    }

    const importText: string = `import { UseMongoConnection } from '@nestgram/mongo'`;
    if (!text.includes(importText)) text = `${importText}\n${text}`;

    let configText: string = (
      await fs.readFile(path.resolve(process.cwd(), 'config', 'default.json'))
    ).toString();

    if (configText) {
      const importConfigText: string = `import config from 'config'`;
      if (!text.includes(importConfigText)) text = `${importConfigText}\n${text}`;

      if (!configText.includes('"mongoUri": "')) {
        configText = configText.replace('}', `  "mongoUri": "${uri}"\n}`);
      }

      await fs.writeFile(path.resolve(process.cwd(), 'config', 'default.json'), configText);
    }

    await fs.writeFile(appModulePath, text);
    logger.success('Module added!');
    logger.info('You can read about mongo module here', MONGO_MODULE_DOCS_LINK);
  } catch (e: any) {
    logger.realError(e);

    logger.error(
      'Failed to apply module. Check your app.module.ts file. It must be in the root of src folder',
    );
  }
}
