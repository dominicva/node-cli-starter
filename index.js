#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';
import enquirer from 'enquirer';
import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import init from './utils/init.js';

const { Input } = enquirer;
const { log } = console;

(async () => {
  init();

  const [err, name] = await to(
    new Input({
      message: 'CLI name?',
      hint: '(only use kebab-case)',
    }).run()
  );

  handleError('INPUT', err);

  const vars = {
    name,
    description: 'CLI to resize and optimize images',
    version: '0.0.1',
    type: 'module',
  };

  const inDir = new URL('template', import.meta.url).pathname;
  const outDir = path.join(cwd(), vars.name);

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    log();
    log(`Creating files in ./${vars.name}`);
    createdFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);
      log(`Created ${fileName}`);
    });
    log('Done!');
    log();
  });
})();
