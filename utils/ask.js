import fs from 'fs';
import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import enquirer from 'enquirer';
const { Input } = enquirer;

export default async function ask({ name, message, hint, initial }) {
  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      validate(value, state) {
        if (state && state.name === 'command') return true;
        if (state && state.name === 'name') {
          if (fs.existsSync(value)) {
            return `Directory already exists ${value}`;
          }
        }
        return !value ? 'Please input a value.' : true;
      }
    })
      .on('cancel', () => process.exit(0))
      .run()
  );

  handleError('INPUT', err);

  return response;
}
