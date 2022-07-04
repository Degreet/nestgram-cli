const inquirer = require('inquirer');
const { logger } = require('../../utils/logger');
const { exec } = require('../../utils/exec');

const fs = require('fs-extra');
const path = require('path');
const { MONGO_MODULE_DOCS_LINK } = require('../../constants');

async function addMongoModule() {
  const uriPrompt = await inquirer.prompt({
    name: 'Enter mongo uri',
  });

  const uri = uriPrompt['Enter mongo uri'];

  logger.success('Installing', '@nestgram/mongo'.grey, 'and', 'mongoose'.grey + '...');
  await exec('yarn add @nestgram/mongo mongoose && yarn add @types/mongoose -D');

  logger.success('Applying changes...');

  try {
    const appModulePath = path.resolve(process.cwd(), 'src', 'app.module.ts');
    let text = (await fs.readFile(appModulePath)).toString();

    if (text.includes('modules: [')) {
      let replaceValue = `modules: [UseMongoConnection(config.get<string>('mongoUri'))`;

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

    const importText = `import { UseMongoConnection } from '@nestgram/mongo'`;
    if (!text.includes(importText)) text = `${importText}\n${text}`;

    let configText = (
      await fs.readFile(path.resolve(process.cwd(), 'config', 'default.json'))
    ).toString();

    if (configText) {
      const importConfigText = `import * as config from 'config'`;
      if (!text.includes(importConfigText)) text = `${importConfigText}\n${text}`;

      if (!configText.includes('"mongoUri": "')) {
        configText = configText.replace('"\n}', `",\n  "mongoUri": "${uri}"\n}`);
      }

      await fs.writeFile(path.resolve(process.cwd(), 'config', 'default.json'), configText);
    }

    await fs.writeFile(appModulePath, text);
    logger.success('Module added!');
    logger.info('You can read about mongo module here', MONGO_MODULE_DOCS_LINK);
  } catch (e) {
    logger.realError(e);

    logger.error(
      'Failed to apply module. Check your app.module.ts file. It must be in the root of src folder',
    );
  }
}

module.exports = { addMongoModule };
