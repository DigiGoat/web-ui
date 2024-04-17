import { execSync, spawn } from 'child_process';
import { readFileSync, writeFileSync, readdirSync, lstatSync, copyFileSync, rmSync } from 'fs';
import { join, extname } from 'path';
import type { Goat } from '../src/app/services/goat/goat.service';


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
  writeFileSync(join(__dirname, './routes.txt'), routes.join('\n'));
}
function build() {
  return new Promise<void>((resolve, reject) => {
    console.debug('> Starting Server');
    const startProcess = spawn('yarn', ['start']);
    startProcess.stdout.on('data', (data) => {
      if (data.includes('Application bundle generation complete.') || data.includes('Port 4200 is already in use.')) {
        console.debug('> Compiling Project');
        execSync('yarn build');
        console.debug('> Stopping Server');
        startProcess.kill();
        resolve();
      }
    });
    startProcess.on('error', (err) => reject(err));
  });
}
function format404() {
  console.debug('> Moving 404 Page From 404 Dir To Base Dir');
  copyFileSync(join(__dirname, '../dist/web-ui/browser/404/index.html'), join(__dirname, '../dist/web-ui/browser/404.html'));
  console.debug('> Removing 404 Dir');
  rmSync(join(__dirname, '../dist/web-ui/browser/404/'), { recursive: true });
}
function sitemap() {
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
  //TODO: Fix `www.some-website.org`
  writeFileSync(join(__dirname, '../dist/web-ui/browser/sitemap.txt'), sitemap.map(entry => `www.some-website.org${entry}`).join('\n'));
}

function cleanup() {
  console.debug('> Deleting Routes.txt');
  rmSync(join(__dirname, './routes.txt'));
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
  sitemap();
  console.log('Done.');
})();
