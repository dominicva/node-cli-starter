#!/usr/bin/env node

import init from './utils/init.js';
import cli from './utils/cli.js';
import generate from './utils/generate.js';
import log from './utils/log.js';

const {
  input,
  flags,
  flags: { clear, debug },
  showHelp,
} = cli;

(async () => {
  init({ clear });

  input.includes('help') && showHelp(0);
  debug && log(flags);

  await generate();
})();
