import { to } from 'await-to-js';
import handleError from 'cli-handle-error';
import enquirer from 'enquirer';
const { Input } = enquirer;

export default async function ask({ message, hint }) {
  const [err, response] = await to(
    new Input({
      message,
      hint,
    }).run()
  );

  handleError('INPUT', err);

  return response;
}
