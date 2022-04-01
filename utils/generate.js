import path from 'path';
import { cwd, chdir } from 'process';
import { execa } from 'execa';
import copy from 'copy-template-dir';
import alert from 'cli-alerts';
import chalk from 'chalk';
import ora from 'ora';
import questions from './questions.js';

const { green: g, yellow: y, dim: d } = chalk;
const { log } = console;
const spinner = ora({ text: '' });

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
    spinner.start(
      `${y(`DEPENDENCIES`)} installing...\n\n${d('It may take a moment...')}`
    );
    chdir(outDirPath);
    const pkgs = [
      'meow',
      'chalk',
      'cli-alerts',
      'cli-welcome',
      'cli-meow-help',
      'cli-handle-error',
      'cli-handle-unhandled'
    ];

    try {
      await execa('git', ['init']);
      await execa('npm', ['install', ...pkgs]);
      await execa('npm', ['install', '-D', 'prettier']);
      await execa('npm', ['dedupe']);
      spinner.succeed(`${g(`DEPENDECIES`)} installed!`);
    } catch (error) {
      console.error(error);
      spinner.stop();
    }

    alert({
      type: 'success',
      name: 'ALL DONE',
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory`
    });
  });
}
