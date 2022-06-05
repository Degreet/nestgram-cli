#!/usr/bin/env node

import * as figlet from 'figlet';
import 'colors';

import { program } from 'commander';
import { logger } from './utils/logger';

import { createNewProject } from './commands/new/new-project';
import { addModule } from './commands/add/add-module';
import { genResource } from './commands/gen/gen-resource';

console.clear();
logger.log(figlet.textSync('Nestgram CLI', { horizontalLayout: 'full' }).blue);

program.name('Nestgram').version('1.4.2').description('The Nestgram CLI');

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
