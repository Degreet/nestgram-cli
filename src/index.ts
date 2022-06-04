#!/usr/bin/env node

import * as figlet from 'figlet';
import 'colors';

import { program } from 'commander';
import { createNewProject } from './new-project';

console.clear();
console.log(figlet.textSync('Nestgram CLI', { horizontalLayout: 'full' }).blue);

program.name('Nestgram').version('1.0.0').description('The Nestgram CLI');

program
  .command('new')
  .argument('name', 'Project name')
  .description('Creates new project')
  .action(createNewProject);

program.parse(process.argv);
