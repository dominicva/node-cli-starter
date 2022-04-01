import { chdir } from 'process';
import ora from 'ora';
import chalk from 'chalk';
import { execa } from 'execa';

const spinner = ora({ text: '' });
const { green: g, yellow: y, dim: d } = chalk;

export default async function executeProcesses(dir) {
  const commands = [
    'git init',
    'npm i meow chalk cli-alerts cli-welcome cli-meow-help cli-handle-error cli-handle-unhandled',
    'npm i -D prettier',
    'npm dedupe',
  ];

  spinner.start(
    `${y(`DEPENDENCIES`)} installing...\n\n${d('It may take a moment...')}`
  );

  chdir(dir);

  try {
    for (const command of commands) {
      const base = command.split(' ')[0];
      const body = command.split(' ').slice(1);
      await execa(base, body);
    }
    spinner.succeed(`${g(`DEPENDECIES`)} installed!`);
  } catch (error) {
    console.error(error);
    spinner.stop();
  }
}
