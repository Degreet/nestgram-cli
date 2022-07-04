const { logger } = require('../../utils/logger');
const { addMongoModule } = require('./mongo');
const inquirer = require('inquirer');

async function addModule() {
  const title = 'Module name';
  const moduleNamePrompt = await inquirer.prompt([
    { name: title, choices: ['Mongo'], type: 'list' },
  ]);

  const moduleName = moduleNamePrompt[title];
  if (moduleName === 'Mongo') await addMongoModule();
  else logger.error(`No module named`, moduleName);
}

module.exports = { addModule };
