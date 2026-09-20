#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const username = process.env.GITHUB_USERNAME || 'serwin35';
const outputDir = path.resolve('public');

if (!token) {
  throw new Error('GITHUB_TOKEN or GH_TOKEN is required');
}

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'User-Agent': `${username}-profile-stats`,
  'X-GitHub-Api-Version': '2022-11-28',
};

async function github(url, options = {}, authenticated = true) {
  const requestHeaders = authenticated
    ? headers
    : {
        Accept: 'application/vnd.github+json',
        'User-Agent': `${username}-profile-stats`,
        'X-GitHub-Api-Version': '2022-11-28',
      };
  const response = await fetch(url, {
    ...options,
    headers: { ...requestHeaders, ...options.headers },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

const query = `
  query ProfileStats($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
      ) {
        nodes {
          forkCount
          stargazerCount
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`;

const [user, commits, pullRequests, graph] = await Promise.all([
  github(`https://api.github.com/users/${username}`, {}, false),
  github(
    `https://api.github.com/search/commits?q=${encodeURIComponent(`author:${username}`)}&per_page=1`,
    {},
    false,
  ),
  github(
    `https://api.github.com/search/issues?q=${encodeURIComponent(`author:${username} type:pr`)}&per_page=1`,
    {},
    false,
  ),
  github('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: username } }),
  }),
]);

if (graph.errors) {
  throw new Error(`GraphQL: ${JSON.stringify(graph.errors)}`);
}

const repositories = graph.data.user.repositories.nodes;
const languageBytes = new Map();
const ignoredLanguages = new Set([
  'HTML',
  'CSS',
  'Makefile',
  'Batchfile',
  'Vim Snippet',
]);

for (const repository of repositories) {
  for (const edge of repository.languages.edges) {
    if (ignoredLanguages.has(edge.node.name)) continue;
    const current = languageBytes.get(edge.node.name) || {
      bytes: 0,
      color: edge.node.color || '#64748b',
    };
    current.bytes += edge.size;
    languageBytes.set(edge.node.name, current);
  }
}

const topLanguageEntries = [...languageBytes.entries()]
  .sort((a, b) => b[1].bytes - a[1].bytes)
  .slice(0, 6);
const topLanguageTotal = topLanguageEntries.reduce(
  (sum, [, language]) => sum + language.bytes,
  0,
);
const topLanguages = topLanguageEntries.map(([name, language]) => ({
  name,
  color: language.color,
  bytes: language.bytes,
  percentage: Number(((language.bytes / topLanguageTotal) * 100).toFixed(1)),
}));

const stats = {
  username,
  publicRepos: user.public_repos,
  followers: user.followers,
  totalStars: repositories.reduce(
    (sum, repository) => sum + repository.stargazerCount,
    0,
  ),
  totalForks: repositories.reduce(
    (sum, repository) => sum + repository.forkCount,
    0,
  ),
  commits: commits.total_count,
  pullRequests: pullRequests.total_count,
  contributionsLastYear:
    graph.data.user.contributionsCollection.contributionCalendar
      .totalContributions,
  topLanguages,
  updatedAt: new Date().toISOString(),
};

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const number = (value) => Number(value).toLocaleString('en-US');
const cardShell = (body, height = 195) => `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="495"
  height="${height}"
  viewBox="0 0 495 ${height}"
  role="img"
  aria-label="GitHub statistics for ${escapeXml(username)}"
>
  <rect width="494" height="${height - 1}" x=".5" y=".5" rx="10" fill="#0d1117" stroke="#30363d"/>
  <style>
    .title { fill: #ff6b00; font: 700 18px system-ui, sans-serif; }
    .value { fill: #f0f6fc; font: 700 22px system-ui, sans-serif; }
    .label { fill: #8b949e; font: 500 12px system-ui, sans-serif; }
    .meta { fill: #6e7681; font: 400 10px system-ui, sans-serif; }
  </style>
  ${body}
</svg>
`;

const statItems = [
  ['Repositories', stats.publicRepos],
  ['Commits', stats.commits],
  ['Pull requests', stats.pullRequests],
  ['Stars', stats.totalStars],
  ['Forks', stats.totalForks],
  ['Contributions · 1y', stats.contributionsLastYear],
];

const statsBody = [
  `<text x="24" y="32" class="title">${escapeXml(username)} · GitHub</text>`,
  ...statItems.map(([label, value], index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 24 + column * 157;
    const y = 75 + row * 66;
    return `<text x="${x}" y="${y}" class="value">${number(value)}</text>
      <text x="${x}" y="${y + 20}" class="label">${escapeXml(label)}</text>`;
  }),
  `<text x="471" y="180" text-anchor="end" class="meta">updated ${stats.updatedAt.slice(0, 10)}</text>`,
].join('\n');

let languageX = 24;
const languageBar = topLanguages
  .map((language) => {
    const width = (language.percentage / 100) * 447;
    const item = `<rect x="${languageX.toFixed(1)}" y="50" width="${width.toFixed(1)}" height="10" fill="${escapeXml(language.color)}"/>`;
    languageX += width;
    return item;
  })
  .join('\n');
const languagesBody = [
  '<text x="24" y="32" class="title">Most used languages</text>',
  `<clipPath id="bar"><rect x="24" y="50" width="447" height="10" rx="5"/></clipPath><g clip-path="url(#bar)">${languageBar}</g>`,
  ...topLanguages.map((language, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 24 + column * 225;
    const y = 88 + row * 30;
    return `<circle cx="${x + 5}" cy="${y - 4}" r="5" fill="${escapeXml(language.color)}"/>
      <text x="${x + 17}" y="${y}" class="label">${escapeXml(language.name)} · ${language.percentage.toFixed(1)}%</text>`;
  }),
  '<text x="471" y="180" text-anchor="end" class="meta">public, owned, non-fork repositories</text>',
].join('\n');

const weeks =
  graph.data.user.contributionsCollection.contributionCalendar.weeks;
const days = weeks.flatMap((week) => week.contributionDays);
const maxContributions = Math.max(
  1,
  ...days.map((day) => day.contributionCount),
);
const cells = weeks
  .flatMap((week, weekIndex) =>
    week.contributionDays.map((day, dayIndex) => {
      const intensity =
        day.contributionCount === 0
          ? 0
          : Math.max(
              1,
              Math.ceil((day.contributionCount / maxContributions) * 4),
            );
      const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
      const x = 82 + weekIndex * 13;
      const y = 48 + dayIndex * 13;
      return `<rect x="${x}" y="${y}" width="10" height="10" rx="2" fill="${colors[intensity]}"><title>${escapeXml(day.date)}: ${day.contributionCount}</title></rect>`;
    }),
  )
  .join('\n');

const contributionsSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="800"
  height="155"
  viewBox="0 0 800 155"
  role="img"
  aria-label="${number(stats.contributionsLastYear)} GitHub contributions in the last year"
>
  <rect width="799" height="154" x=".5" y=".5" rx="10" fill="#0d1117" stroke="#30363d"/>
  <style>
    .title { fill: #ff6b00; font: 700 16px system-ui, sans-serif; }
    .label { fill: #8b949e; font: 500 10px system-ui, sans-serif; }
  </style>
  <text x="24" y="28" class="title">${number(stats.contributionsLastYear)} contributions in the last year</text>
  <text x="24" y="62" class="label">Mon</text>
  <text x="24" y="88" class="label">Wed</text>
  <text x="24" y="114" class="label">Fri</text>
  ${cells}
</svg>
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(
    path.join(outputDir, 'github-stats.json'),
    `${JSON.stringify(stats, null, 2)}\n`,
  ),
  writeFile(path.join(outputDir, 'github-stats.svg'), cardShell(statsBody)),
  writeFile(
    path.join(outputDir, 'github-languages.svg'),
    cardShell(languagesBody),
  ),
  writeFile(path.join(outputDir, 'github-contributions.svg'), contributionsSvg),
]);

console.log(
  `Updated GitHub snapshot: ${stats.publicRepos} repos, ${stats.commits} commits, ${stats.pullRequests} PRs`,
);
