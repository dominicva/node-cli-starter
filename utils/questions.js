import ask from './ask.js';

export default async function getResponses() {
  // Gather user input
  const name = await ask({
    name: 'name',
    message: 'CLI name?',
    hint: '(kebab-case only)'
  });
  const command = await ask({
    name: 'command',
    message: 'CLI command?',
    hint: '(optional: if different from CLI name)'
  });
  const description = await ask({
    name: 'description',
    message: 'CLI description?'
  });
  const version = await ask({
    name: 'version',
    message: 'CLI version?',
    initial: '0.0.1'
  });
  const license = await ask({
    name: 'license',
    message: 'CLI license?',
    initial: 'UNLICENSED'
  });
  const authorName = await ask({
    name: 'authorName',
    message: 'CLI author name?'
  });
  const authorEmail = await ask({
    name: 'authorEmail',
    message: 'CLI author email?'
  });
  const authorURL = await ask({
    name: 'authorURL',
    message: 'CLI author URL?'
  });

  // Package up user input
  return {
    name,
    command: command ? command : name,
    description,
    version,
    license,
    authorName,
    authorEmail,
    authorURL
  };
}
