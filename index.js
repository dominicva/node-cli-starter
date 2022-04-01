#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';
import chalk from 'chalk';
import alert from 'cli-alerts';

import init from './utils/init.js';
import ask from './utils/ask.js';

const { log } = console;
const { green: g, dim: d } = chalk;

(async () => {
  init();

  const name = await ask({ message: 'CLI name?', hint: '(kebab-case only)' });
  const description = await ask({ message: 'CLI description?' });
  const version = await ask({ message: 'CLI version?', initial: '0.0.1' });
  const type = await ask({
    message: 'Module type?',
    initial: 'module',
    hint: 'commonjs or module',
  });
  const license = await ask({ message: 'CLI license?', initial: 'UNLICENSED' });
  const authorName = await ask({ message: 'CLI author name?' });
  const authorEmail = await ask({ message: 'CLI author email?' });
  const authorURL = await ask({ message: 'CLI author URL?' });

  const vars = {
    name,
    description,
    version,
    type,
    license,
    authorName,
    authorEmail,
    authorURL,
  };

  const { name: outDir } = vars;
  const inDirPath = new URL('template', import.meta.url).pathname;
  const outDirPath = path.join(cwd(), vars.name);

  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;

    log(d(`\nCreating files in ${g(`./${outDir}`)} directory\n`));

    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath);
      log(`${g('CREATED')} ${fileName}`);
    });

    alert({
      type: 'success',
      name: 'ALL DONE',
      msg: `\n\n${createdFiles.length} files created in ${d(`./${outDir}`)} directory`,
    });
  });
})();
