#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

const profile = JSON.parse(
  await readFile(new URL('../src/data/profile.json', import.meta.url), 'utf8'),
);
const readmeUrl = new URL('../README.md', import.meta.url);
let readme = await readFile(readmeUrl, 'utf8');

const years = new Date().getFullYear() - profile.careerStartYear;
const projects = profile.projectsDelivered;

function replaceRequired(pattern, replacement, label) {
  if (!pattern.test(readme)) {
    throw new Error(`README pattern not found: ${label}`);
  }
  readme = readme.replace(pattern, replacement);
}

replaceRequired(
  /\d+%2B\+years\+of\+Full\+Stack\+%26\+DevOps\+experience/,
  `${years}%2B+years+of+Full+Stack+%26+DevOps+experience`,
  'typing years',
);
replaceRequired(
  /\d+%2B\+projects\+delivered/,
  `${projects}%2B+projects+delivered`,
  'typing projects',
);
replaceRequired(
  /public int \$yearsOfExperience = \d+;/,
  `public int $yearsOfExperience = ${years};`,
  'PHP years',
);
replaceRequired(
  /public int \$projectsDelivered = \d+;/,
  `public int $projectsDelivered = ${projects};`,
  'PHP projects',
);
replaceRequired(
  /\*\*PHP\*\* veteran — \d+\+ years/,
  `**PHP** veteran — ${years}+ years`,
  'quick facts years',
);

await writeFile(readmeUrl, readme);
console.log(`README numbers updated: ${years}+ years, ${projects}+ projects`);
