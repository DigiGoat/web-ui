// Make sure that the pull request updated the version in the package.json
import axios from 'axios';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import packageJson from '../package.json';
import { gt } from 'semver';
import Git from 'simple-git';

const origin = `origin/${process.env['GITHUB_BASE_REF']}`;

const ci = !!process.env['CI'];
const log = {
  debug: (...message: unknown[]): void => console.debug(chalk.dim('>', ...message)),
  info: (...message: unknown[]): void => console.log(...message),
  warn: (...message: unknown[]): void => console.warn(`${ci ? '::warning::' : ''}${chalk.yellowBright(...message)}`),
  error: (...message: unknown[]): void => console.error(`${ci ? '::error::' : ''}${chalk.redBright(...message)}`),
  success: (...message: unknown[]): void => console.log(chalk.greenBright(...message))
};
if (!ci) {
  log.error('This workflow may only be run by a pull request!');
  process.exit(1);
}
const git = Git();
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env['GITHUB_TOKEN']}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
});


let success = true;
async function checkVersion() {
  const version = JSON.parse(await git.show(`${origin}:package.json`)).version;
  if (gt(packageJson.version, version)) {
    log.error('The package.json version is not updated in the this request');
    success = false;
  }
}
async function checkSensitiveFiles() {
  const diffSummary = await git.diffSummary(origin);
  const sensitiveFiles = diffSummary.files.filter(file => file.file.startsWith('src/assets/'));
  if (sensitiveFiles.length > 0) {
    log.error('Sensitive files have been modified in this pull request');
    sensitiveFiles.forEach(file => log.warn('Sensitive file modified:', file));
    success = false;
  }
}
async function previewChangelog() {
  const oldChangelog = await git.show('origin:CHANGELOG.md');
  const changelog = await readFile('../CHANGELOG.md', 'utf-8');
  const changes = changelog.substring(0, -oldChangelog.length);
  log.info('Changelog changes', changes);
  github.post(`/repos/${process.env['GITHUB_ACTION_REPOSITORY']}/issues/${process.env['GITHUB_REF_NAME']!.split('/')[0]}/comments`, `# Changelog Preview:\n\n${changes}`);
}
(async () => {
  await checkVersion();
  await checkSensitiveFiles();
  await previewChangelog();
  if (success) {
    log.success('Pre-Check Passed');
  } else {
    log.error('Pre-Check Failed');
    process.exit(1);
  }
})();
