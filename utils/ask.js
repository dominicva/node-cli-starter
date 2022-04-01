import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import enquirer from 'enquirer';
const { Input } = enquirer;

export default async function ask({ message, hint, initial }) {
  const [err, response] = await to(
    new Input({
      message,
      hint,
      initial,
    }).run()
  );

  handleError('INPUT', err);

  return response;
}
