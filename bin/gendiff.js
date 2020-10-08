#!/usr/bin/env node

import commander from 'commander';
import diff from '../src/index.js';


const program = new commander.Command();

program
  .version('0.0.1', '-v, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2));
  });

program.parse(process.argv);
