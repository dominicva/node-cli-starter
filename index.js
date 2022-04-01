#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';

import init from './utils/init.js';
import ask from './utils/ask.js';

const { log } = console;

(async () => {
  init();

  const name = await ask({
    message: 'CLI name?',
    hint: '(kebab-case only)',
  });
  const description = await ask({
    message: 'CLI description',
  });

  const version = await ask({
    message: 'CLI version',
  });

  const type = await ask({
    message: 'module type',
    hint: 'commonjs or module',
  });

  const vars = {
    name,
    description,
    version,
    type,
  };

  const inDir = new URL('template', import.meta.url).pathname;
  const outDir = path.join(cwd(), vars.name);

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    log();
    log(`Creating files in ./${vars.name}`);
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath);
      log(`Created ${fileName}`);
    });
    log('Done!');
    log();
  });
})();
