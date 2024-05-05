import chalk from 'chalk';
import { execSync } from 'child_process';
import { copyFileSync, lstatSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Goat } from '../src/app/services/goat/goat.service';

const log = {
  debug: (...message: unknown[]): void => console.debug(chalk.dim('>', ...message)),
  info: (...message: unknown[]): void => console.log(...message),
  warn: (...message: unknown[]): void => console.warn(chalk.yellow(...message)),
  error: (...message: unknown[]): void => console.error(chalk.red(...message)),
  success: (...message: unknown[]): void => console.log(chalk.green(...message))
};

const config: Record<string, string> = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
if (process.argv[2]) {
  if (URL.canParse(process.argv[2])) {
    log.debug(`Adding '${process.argv[2]}' to the Config`);
    config['link'] = new URL(process.argv[2]).toString();
    writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));
  } else {
    log.error('ARGUMENT PROVIDED IS NOT A VALID URL');
    log.warn('↳ Using URL From Config');

  }
}
const url = config['link'] ? new URL(config['link']) : undefined;
function route() {
  const routes: string[] = ['/404'];
  log.debug('Identifying Doe Routes');
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  does.forEach(doe => {
    if (doe.nickname || doe.name || doe.normalizeId) {
      const route = `/does/${doe.nickname || doe.name || doe.normalizeId}`;
      log.debug(`Adding Doe Route '${route}'`);
      routes.push(route);
    }
  });
  log.debug('Identifying Buck Routes');
  const bucks: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/bucks.json'), 'utf-8'));
  bucks.forEach(buck => {
    if (buck.nickname || buck.name || buck.normalizeId) {
      const route = `/bucks/${buck.nickname || buck.name || buck.normalizeId}`;
      log.debug(`Adding Buck Route '${route}'`);
      routes.push(route);
    }
  });
  log.debug('Writing Routes');
  writeFileSync(join(__dirname, '../routes.txt'), routes.join('\n'));
}
function build() {
  log.debug('Compiling Project');
  const base = url?.pathname;
  execSync(`yarn build ${base ? `--base-href ${base}${base.endsWith('/') ? '' : '/'}` : ''}`);
}
function cleanup() {
  log.debug('Deleting Routes.txt');
  rmSync(join(__dirname, '../routes.txt'));
}
function format404() {
  log.debug('Moving 404 Page From 404 Dir To Base Dir');
  copyFileSync(join(__dirname, '../dist/web-ui/browser/404/index.html'), join(__dirname, '../dist/web-ui/browser/404.html'));
  log.debug('Removing 404 Dir');
  rmSync(join(__dirname, '../dist/web-ui/browser/404/'), { recursive: true });
}
function sitemap(link: string) {
  const sitemap: string[] = [];
  const rootDir = join(__dirname, '../dist/web-ui/browser');

  function scanDirectory(directory: string) {
    const items = readdirSync(directory);
    items.forEach(item => {
      const fullPath = join(directory, item);
      if (lstatSync(fullPath).isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'index.html') {
        const sitemapEntry = fullPath.replace(rootDir, '').replace('index.html', '');
        log.debug(`Adding Page '${sitemapEntry}'`);
        sitemap.push(sitemapEntry);
      }
    });
  }

  scanDirectory(rootDir);
  log.debug('Writing Sitemap');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/sitemap.txt'), sitemap.map(entry => `${link.endsWith('/') ? link.slice(0, -1) : link}${entry}`).join('\n'));
}

function robots(link?: string) {
  log.debug('Writing robots.txt');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/robots.txt'),
    `# Allow all URLs (see https://www.robotstxt.org/robotstxt.html)
User-agent: *
Disallow:${link ? `
Sitemap: ${link.endsWith('/') ? link.slice(0, -1) : link}/sitemap.txt` : ''}`);
}

log.info('Routing...');
route();
log.info('Building...');
build();
log.info('Cleaning Up...');
cleanup();
log.info('Formatting 404...');
format404();
log.info('Generating Sitemap...');
if (url) {
  sitemap(url.toString());
} else {
  log.error('NO URL FOUND IN CONFIG!');
  log.warn('↳ Skipping Sitemap Generation');
}
log.info('Generating Robots.txt...');
if (url) {
  if (url.pathname === '/') {
    robots(url.toString());
  } else {
    log.error('URL IN CONFIG IS NOT AT THE BASE OF THE DOMAIN');
    log.warn('↳ Skipping robots.txt Generation');
  }
} else {
  log.error('NO URL FOUND IN CONFIG!');
  log.warn('↳ Omitting Sitemap From robots.txt');
  robots();
}
log.success('Done.');
