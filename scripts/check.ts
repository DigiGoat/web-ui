// Make sure that the pull request updated the version in the package.json
import axios from 'axios';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { lte } from 'semver';
import Git from 'simple-git';
import packageJson from '../package.json';

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
    Authorization: `token ${process.env['GITHUB_TOKEN']}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
});


let success = true;
const summary = ['## Pre Check Summary:', ''];
async function checkVersion() {
  const version = JSON.parse(await git.show(`${origin}:package.json`)).version;
  log.debug('Old version', version);
  log.debug('New version', packageJson.version);
  if (lte(packageJson.version, version)) {
    log.error('The version associated with this pull request is not greater than the previous version');
    summary.push(`- [ ] Version Check: \`v${version} <= v${packageJson.version}\``);
    success = false;
  } else {
    summary.push(`- [x] Version Check: \`v${version} --> v${packageJson.version}\``);
  }
}
async function checkSensitiveFiles() {
  const diffSummary = await git.diffSummary(origin);
  log.debug('Diff Summary', diffSummary);
  const sensitiveFiles = diffSummary.files.filter(file => file.file.startsWith('src/assets/'));
  if (sensitiveFiles.length > 0) {
    log.error('Sensitive files have been modified in this pull request');
    summary.push(`- [ ] Sensitive Files Check: Sensitive files modified (\`${sensitiveFiles.join(', ')}\`)`);
    sensitiveFiles.forEach(file => log.warn('Sensitive file modified:', file));
    success = false;
  } else {
    summary.push('- [x] Sensitive Files Check: No sensitive files modified');
  }
}
async function previewChangelog() {
  const oldChangelog = await git.show(`${origin}:CHANGELOG.md`).catch(() => {
    log.warn('The changelog is missing in the base branch');
  });
  log.debug('Old Changelog', oldChangelog);
  const changelog = await readFile('CHANGELOG.md', 'utf-8');
  log.debug('New Changelog', changelog);
  const changes = oldChangelog ? changelog.substring(0, -oldChangelog.length) : changelog;
  log.info('Changelog changes', changes);
  if (!changes.length) {
    log.error('No changes have been made to the changelog');
    summary.push('- [ ] Changelog Check: No changes made to the changelog');
    success = false;
  } else {
    summary.push('- [x] Changelog Check: Changes made to the changelog');
    summary.push('### Changelog Preview:', changes.split('\n#').join('\n###'));
  }
}
(async () => {
  try {
    console.log('Checking the version...');
    await checkVersion();
    console.log('Checking for sensitive files...');
    await checkSensitiveFiles();
    console.log('Previewing the changelog...');
    await previewChangelog();
    if (success) {
      log.success('Pre-Check Passed');
      summary.unshift('# :white_check_mark: Pre-Check Passed :white_check_mark:');
    } else {
      log.error('Pre-Check Failed');
      summary.unshift('# :x: Pre-Check Failed :x:');
      process.exitCode = 1;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      log.error('An error occurred during the pre-checks:', err);
      summary.push(`- [ ] An error occurred during the pre-checks: \`${err.message}\``);
    } else {
      log.error('An unknown error occurred during the pre-checks:', err);
      summary.push(`- [ ] An unknown error occurred during the pre-checks: \`${err}\``);
    }
  }
  console.log('Posting the summary...');
  await postSummary();
})();

async function postSummary() {
  await github.post(`/repos/${process.env['GITHUB_REPOSITORY']}/issues/${process.env['GITHUB_REF_NAME']!.split('/')[0]}/comments`, {
    body: summary.join('\n')
  });
}
