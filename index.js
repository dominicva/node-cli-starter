#!/usr/bin/env node

import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';

const { log } = console;

const vars = {
  name: 'cli-img',
  description: 'CLI to resize and optimize images',
  version: '0.0.1',
  type: 'module',
};

const inDir = new URL('template', import.meta.url).pathname;
const outDir = path.join(cwd(), vars.name);

// console.log('inDir', inDir);
// console.log('outDir', outDir);

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
