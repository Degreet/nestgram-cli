const { logger } = require('../../utils/logger');
const { exec } = require('../../utils/exec');

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

async function createNewProject(name) {
  const tokenPrompt = await inquirer.prompt({
    name: 'Enter bot token',
  });

  const token = tokenPrompt['Enter bot token'];
  const destPath = path.resolve(process.cwd(), name);

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
  logger.info('Run project'.grey, `cd ${name} && npm run dev`);
}

module.exports = { createNewProject };
