#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';
import chalk from 'chalk';
import alert from 'cli-alerts';

import init from './utils/init.js';
import cli from './utils/cli.js';
import questions from './utils/questions.js';

const { log } = console;
const { green: g, dim: d } = chalk;

const {
  input,
  flags: { clear },
  showHelp,
} = cli;

(async () => {
  init({ clear });

  input.includes('help') && showHelp(0);

  // Gather all the user input into an object
  const vars = await questions();

  // Determine correct file/directory paths/names
  const { name: outDir } = vars;
  const inDirPath = new URL('template', import.meta.url).pathname;
  const outDirPath = path.join(cwd(), outDir);

  // Copy files in template dir to outDir passing-in user input (vars object)
  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;

    log(d(`\nCreating files in ${g(`./${outDir}`)} directory\n`));

    for (const filePath of createdFiles) {
      const fileName = path.basename(filePath);
      log(`${g('CREATED')} ${fileName}`);
    }

    alert({
      type: 'success',
      name: 'ALL DONE',
      msg: `\n\n${createdFiles.length} files created in ${d(`./${outDir}`)} directory`,
    });
  });
})();
