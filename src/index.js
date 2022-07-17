#!/usr/bin/env node

const figlet = require('figlet');
require('colors');

const { program } = require('commander');
const { logger } = require('./utils/logger');

const { createNewProject } = require('./commands/new/new-project');
const { addModule } = require('./commands/add/add-module');
const { genResource } = require('./commands/gen/gen-resource');

console.clear();
logger.log(figlet.textSync('Nestgram CLI', { horizontalLayout: 'full' }).blue);

program.name('Nestgram').version('1.5.1').description('The Nestgram CLI');

program
  .command('new')
  .argument('name', 'Project name')
  .description('Creates new project')
  .action(createNewProject);

program
  .command('gen')
  .argument('name', 'Resource name')
  .description('Generates new resource')
  .action(genResource);

program.command('add').description('Adds module to your project').action(addModule);
program.parse(process.argv);
