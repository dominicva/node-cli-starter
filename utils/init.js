import { readFile } from 'fs/promises';
import welcome from 'cli-welcome';
import unhandled from 'cli-handle-unhandled';

const filePath = new URL('./../package.json', import.meta.url);
const { description, version } = await readFile(filePath, {
  encoding: 'utf-8',
}).then(json => JSON.parse(json));

export default function init({ clear = true }) {
  unhandled();

  welcome({
    title: 'node-cli-starter',
    tagLine: 'by Dom',
    description,
    version,
    bgColor: '#6cc24a',
    color: '#000000',
    bold: true,
    clear,
  });
}
