import path from 'path';
import { cwd } from 'process';
import copy from 'copy-template-dir';
import alert from 'cli-alerts';
import chalk from 'chalk';
import questions from './questions.js';
import executeProcesses from './executeProcesses.js';

const { green: g, dim: d } = chalk;
const { log } = console;

export default async function generate() {
  // Gather all the user input into an object
  const vars = await questions();

  // Determine correct file/directory paths/names
  const { name: outDir } = vars;
  const inDirPath = new URL('template', path.join(import.meta.url, '..'))
    .pathname;
  const outDirPath = path.join(cwd(), outDir);

  // Copy files in template dir to outDir passing-in user input (vars object)
  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;

    log(d(`\nCreating files in ${g(`./${outDir}`)} directory\n`));

    for (const filePath of createdFiles) {
      const fileName = path.basename(filePath);
      log(`${g('CREATED')} ${fileName}`);
    }

    log();

    // git init and install dependencies
    await executeProcesses(outDirPath);

    alert({
      type: 'success',
      name: 'ALL DONE',
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory`,
    });
  });
}
