import { execSync, spawn } from 'child_process';
import { copyFileSync, lstatSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Goat } from '../src/app/services/goat/goat.service';

const config: Record<string, any> = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
if (process.argv[2]) {
  config['link'] = new URL(process.argv[2]).toString();
  writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));
}
const url = config['link'] ? new URL(config['link']) : undefined;
function route() {
  const routes: string[] = ['/404'];
  console.debug('> Identifying Doe Routes');
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  does.forEach(doe => {
    if (doe.nickname || doe.name || doe.normalizeId) {
      routes.push(`/does/${doe.nickname || doe.name || doe.normalizeId}`);
    }
  });
  console.debug('> Identifying Buck Routes');
  const bucks: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/bucks.json'), 'utf-8'));
  bucks.forEach(buck => {
    if (buck.nickname || buck.name || buck.normalizeId) {
      routes.push(`/bucks/${buck.nickname || buck.name || buck.normalizeId}`);
    }
  });
  console.debug('> Writing Routes');
  writeFileSync(join(__dirname, '../routes.txt'), routes.join('\n'));
}
function build() {
  return new Promise<void>((resolve, reject) => {
    console.debug('> Starting Server');
    const startProcess = spawn('yarn', ['start']);
    startProcess.stdout.on('data', (data) => {
      if (data.includes('Application bundle generation complete.') || data.includes('Port 4200 is already in use.')) {
        console.debug('> Compiling Project');
        const base = url?.pathname;
        execSync(`yarn build ${base ? `--base-href ${base}${base.endsWith('/') ? '' : '/'}` : ''}`);
        console.debug('> Stopping Server');
        startProcess.kill();
        resolve();
      }
    });
    startProcess.on('error', (err) => reject(err));
  });
}
function cleanup() {
  console.debug('> Deleting Routes.txt');
  rmSync(join(__dirname, '../routes.txt'));
}
function format404() {
  console.debug('> Moving 404 Page From 404 Dir To Base Dir');
  copyFileSync(join(__dirname, '../dist/web-ui/browser/404/index.html'), join(__dirname, '../dist/web-ui/browser/404.html'));
  console.debug('> Removing 404 Dir');
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
        console.debug(`> Adding Page ${sitemapEntry}`);
        sitemap.push(sitemapEntry);
      }
    });
  }

  scanDirectory(rootDir);
  console.debug('> Writing Sitemap');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/sitemap.txt'), sitemap.map(entry => `${link.endsWith('/') ? link.slice(0, -1) : link}${entry}`).join('\n'));
}

function robots(link?: string) {
  console.debug('> Writing robots.txt');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/robots.txt'),
    `# Allow all URLs (see https://www.robotstxt.org/robotstxt.html)
User-agent: *
Disallow:${link ? `
Sitemap: ${link.endsWith('/') ? link.slice(0, -1) : link}/sitemap.txt` : ''}`);
}

(async () => {
  console.log('Routing...');
  route();
  console.log('Building...');
  await build();
  console.log('Cleaning Up...');
  cleanup();
  console.log('Formatting 404...');
  format404();
  console.log('Generating Sitemap...');
  if (url) {
    sitemap(url.toString());
  } else {
    console.warn('NO URL FOUND IN CONFIG!');
    console.warn('↳ Skipping Sitemap Generation');
  }

  console.log('Generating Robots.txt...');
  if (url) {
    if (url.pathname === '/') {
      robots(url.toString());
    } else {
      console.warn('URL IN CONFIG IS NOT AT THE BASE OF THE DOMAIN');
      console.warn('↳ Skipping robots.txt Generation');
    }
  } else {
    console.warn('NO URL FOUND IN CONFIG!');
    console.warn('↳ Omitting Sitemap From robots.txt');
    robots();
  }
  console.log('Done.');
})();
