import axios from 'axios';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Goat, Kidding } from '../src/app/services/goat/goat.service';

const ci = !!process.env['CI'];
if (ci) {
  console.log('::group::Starting Build');
}
const log = {
  debug: (...message: unknown[]): void => console.debug(chalk.dim('>', ...message)),
  info: (...message: unknown[]): void => ci ? console.log(`::endgroup::\n::group::${message.shift()}\n`, ...message) : console.log(...message),
  warn: (...message: unknown[]): void => console.warn(`${ci ? '::warning::' : ''}${chalk.yellowBright(...message)}`),
  error: (...message: unknown[]): void => console.error(`${ci ? '::error::' : ''}${chalk.redBright(...message)}`),
  success: (...message: unknown[]): void => console.log(chalk.greenBright(...message)),
  notice: (...message: unknown[]): void => console.log(ci ? '::notice::' : '', chalk.cyanBright(...message)),
};

const config: Record<string, string | Record<string, string | Record<string, string>>> = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
if (process.argv[2]) {
  if (URL.canParse(process.argv[2])) {
    log.debug(`Adding '${process.argv[2]}' to the Config`);
    config['link'] = new URL(process.argv[2]).toString();
  } else {
    log.error('ARGUMENT PROVIDED IS NOT A VALID URL');
    log.warn('↳ Using URL From Config');

  }
}
if (config['firebase'] && ci) {
  log.debug('Adding Firebase Config');
  const repoName = process.env['GITHUB_REPOSITORY']?.split('/')[1]?.toLowerCase();
  if (repoName) {
    const firebaseConfig = config['firebase'] as Record<string, string>;
    firebaseConfig['projectId'] = repoName;
    firebaseConfig['authDomain'] = `${repoName}.firebaseapp.com`;
    firebaseConfig['storageBucket'] = `${repoName}.firebasestorage.app`;
    log.debug(`Set Firebase Project ID to '${repoName}'`);
  } else {
    log.error('Failed to determine Firebase Project ID from GITHUB_REPOSITORY');
  }
}
log.debug('Writing Updated Config');
writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));

const url = config['link'] ? new URL(config['link'] as string) : undefined;
function route() {
  const routes: string[] = ['/404'];
  log.debug('Identifying Doe Routes');
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  does.forEach(doe => {
    if (doe.nickname || doe.name || doe.normalizeId) {
      const route = `/does/${(doe.nickname || doe.name || doe.normalizeId)?.replace(/ /g, '-')}`;
      log.debug(`Adding Doe Route '${route}'`);
      routes.push(route);
    }
  });
  routes.push('/does/Doe-Not-Found');
  log.debug('Identifying Buck Routes');
  const bucks: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/bucks.json'), 'utf-8'));
  bucks.forEach(buck => {
    if (buck.nickname || buck.name || buck.normalizeId) {
      const route = `/bucks/${(buck.nickname || buck.name || buck.normalizeId)?.replace(/ /g, '-')}`;
      log.debug(`Adding Buck Route '${route}'`);
      routes.push(route);
    }
  });
  routes.push('/bucks/Buck-Not-Found');
  if (config['references']) {
    log.debug('Identifying Reference Goat Routes');
    const references: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/references.json'), 'utf-8'));
    references.forEach(reference => {
      if (reference.nickname || reference.name || reference.normalizeId) {
        const route = `/references/${(reference.nickname || reference.name || reference.normalizeId)?.replace(/ /g, '-')}`;
        log.debug(`Adding Reference Route '${route}'`);
        routes.push(route);
      }
    });
    routes.push('/references/Reference-Not-Found');
  }
  if (config['forSale']) {
    log.debug('Identifying For Sale Routes');
    const forSale: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/for-sale.json'), 'utf-8'));
    forSale.forEach(sale => {
      if (sale.nickname || sale.name || sale.normalizeId) {
        const route = `/for-sale/${(sale.nickname || sale.name || sale.normalizeId)?.replace(/ /g, '-')}`;
        log.debug(`Adding For Sale Route '${route}'`);
        routes.push(route);
      }
    });
    routes.push('/for-sale/Goat-Not-Found');
  }
  if (config['kiddingSchedule']) {
    log.debug('Writing Kidding Schedule Goat Card');
    routes.push('/kidding-schedule/Kidding-Goat');
  }
  log.debug('Writing Routes');
  writeFileSync(join(__dirname, '../routes.txt'), routes.join('\n'));
}
async function setupMarkdown() {
  async function renderMarkdown(markdown: string) {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
    if (process.env['GITHUB_TOKEN']) {
      headers['Authorization'] = `token ${process.env['GITHUB_TOKEN']}`;
    }
    return (await axios.post('https://api.github.com/markdown', { text: markdown, mode: 'gfm' }, { headers })).data as string;
  }
  const config = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
  if (config['homeDescription']) {
    log.debug('Rendering Markdown For Homepage');
    config['homeDescription'] = await renderMarkdown(config['homeDescription']);
    writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));
  }
  if (config['kiddingScheduleDescription']) {
    log.debug('Rendering Markdown For Kidding Schedule');
    config['kiddingScheduleDescription'] = await renderMarkdown(config['kiddingScheduleDescription']);
    writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));
  }
  if (config['saleTerms']) {
    log.debug('Rendering Markdown For Sale Terms');
    config['saleTerms'] = await renderMarkdown(config['saleTerms']);
    writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config, null, 2));
  }
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  if (does.length) {
    log.debug('Rendering Markdown For Does');
    for (const doe of does) {
      if (doe.description) {
        log.debug(`Rendering Markdown For Doe ${doe.nickname || doe.name || doe.normalizeId}`);
        doe.description = await renderMarkdown(doe.description);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/does.json'), JSON.stringify(does));
  }
  const bucks: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/bucks.json'), 'utf-8'));
  if (bucks.length) {
    log.debug('Rendering Markdown For Bucks');
    for (const buck of bucks) {
      if (buck.description) {
        log.debug(`Rendering Markdown For Buck ${buck.nickname || buck.name || buck.normalizeId}`);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/bucks.json'), JSON.stringify(bucks));
  }
  const references: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/references.json'), 'utf-8'));
  if (references.length) {
    log.debug('Rendering Markdown For References');
    for (const reference of references) {
      if (reference.description) {
        log.debug(`Rendering Markdown For Reference ${reference.nickname || reference.name || reference.normalizeId}`);
        reference.description = await renderMarkdown(reference.description);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/references.json'), JSON.stringify(references));
  }
  const kiddingSchedule: Kidding[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/kidding-schedule.json'), 'utf-8'));
  if (kiddingSchedule.length) {
    log.debug('Rendering Markdown For Kidding Schedule');
    for (const kidding of kiddingSchedule) {
      if (kidding.description) {
        log.debug(`Rendering Markdown For Kidding ${kidding.dam} x ${kidding.sire}`);
        kidding.description = await renderMarkdown(kidding.description);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/kidding-schedule.json'), JSON.stringify(kiddingSchedule));
  }
  const forSale: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/for-sale.json'), 'utf-8'));
  if (forSale.length) {
    log.debug('Rendering Markdown For For Sale');
    for (const sale of forSale) {
      if (sale.description) {
        log.debug(`Rendering Markdown For Sale ${sale.nickname || sale.name || sale.normalizeId}`);
        sale.description = await renderMarkdown(sale.description);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/for-sale.json'), JSON.stringify(forSale));
  }
}
function build() {
  log.debug('Compiling Project');
  const base = url?.pathname;
  try {
    execSync(`yarn build ${base ? `--base-href ${base}${base.endsWith('/') ? '' : '/'}` : ''}`);
  } catch (error) {
    log.error('Failed to Compile Project:', error, (error as Record<string, string>).stderr.toString());
    process.exit(1);
  }
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
async function sitemap(link: string) {
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
  log.debug('Fetching Old Sitemap');
  let oldSitemap: Record<string, string> = {};
  try {
    const response = await axios.get(`${link}/sitemap.json`);
    oldSitemap = response.data;
  } catch (error) {
    log.error('Failed to fetch old sitemap:', error);
    log.warn('↳ Generating New Sitemap');
  }
  log.debug('Writing sitemap.json');

  const newSitemap: Record<string, string> = {};
  const imageSitemap: Record<string, string[]> = {};
  const changedPages: string[] = [];
  for (const page of Object.keys(oldSitemap)) {
    if (!sitemap.includes(page)) {
      log.debug(`Page removed: ${page}`);
      changedPages.push(page);
    }
  }
  for (const page of sitemap) {
    const fullPageUrl = `${link.endsWith('/') ? link.slice(0, -1) : link}${page}`;
    const newPagePath = join(rootDir, page, 'index.html');
    const prevPagePath = join(__dirname, '../previous-deploy/browser', page, 'index.html');

    let oldTitle: string | null = null;
    let oldMetaDescription: string | null = null;
    let usedArtifact = false;

    if (existsSync(prevPagePath)) {
      log.debug(`Reading previous deploy content from: ${prevPagePath}`);
      const prevPageContent = readFileSync(prevPagePath, 'utf-8');
      const oldTitleMatch = prevPageContent.match(/<title>(.*?)<\/title>/);
      const oldMetaDescriptionMatch = prevPageContent.match(/<meta name="description" content="(.*?)"/);
      oldTitle = oldTitleMatch ? oldTitleMatch[1] : null;
      oldMetaDescription = oldMetaDescriptionMatch ? oldMetaDescriptionMatch[1] : null;
      usedArtifact = true;
    } else {
      log.warn(`Previous deploy file not found for page: ${page}, falling back to HTTP fetch.`);
      try {
        log.debug(`Fetching page: ${fullPageUrl}`);
        const response = await axios.get(fullPageUrl);
        const oldTitleMatch = response.data.match(/<title>(.*?)<\/title>/);
        const oldMetaDescriptionMatch = response.data.match(/<meta name="description" content="(.*?)"/);
        oldTitle = oldTitleMatch ? oldTitleMatch[1] : null;
        oldMetaDescription = oldMetaDescriptionMatch ? oldMetaDescriptionMatch[1] : null;
      } catch (error) {
        log.error(`Failed to fetch or parse page ${fullPageUrl} With Error:`, error);
        log.warn('↳ Generating New Sitemap Entry');
        newSitemap[page] = new Date().toISOString();
        changedPages.push(page);
        continue;
      }
    }

    log.debug(`Reading new page content from: ${newPagePath}`);
    const newPageContent = readFileSync(newPagePath, 'utf-8');
    const newTitleMatch = newPageContent.match(/<title>(.*?)<\/title>/);
    const newMetaDescriptionMatch = newPageContent.match(/<meta name="description" content="(.*?)"/);
    const ogImageMatches = newPageContent.matchAll(/<meta property="og:image" content="(.+?)"/g);

    const newTitle = newTitleMatch ? newTitleMatch[1] : null;
    const newMetaDescription = newMetaDescriptionMatch ? newMetaDescriptionMatch[1] : null;
    const ogImages = Array.from(ogImageMatches).map(match => match[1]);
    imageSitemap[page] = ogImages;

    if (oldTitle === newTitle && oldMetaDescription === newMetaDescription) {
      log.debug(`No changes detected for page: ${page} (${usedArtifact ? 'artifact' : 'http'})`);
      newSitemap[page] = oldSitemap[page] || new Date().toISOString();
    } else {
      log.debug(`Changes detected for page: ${page} (${usedArtifact ? 'artifact' : 'http'})`);
      newSitemap[page] = new Date().toISOString();
      changedPages.push(page);
    }
  }
  writeFileSync(join(__dirname, '../dist/web-ui/browser/sitemap.json'), JSON.stringify(newSitemap, null, 2));
  log.debug('Writing sitemap.xml');
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemap.map(page => `
  <url>
    <loc>${link.endsWith('/') ? link.slice(0, -1) : link}${page}</loc>
    <lastmod>${newSitemap[page]}</lastmod>${imageSitemap[page]?.map(image => `
    <image:image>
      <image:loc>${image}</image:loc>
    </image:image>`).join('')}
  </url>`).join('')}
</urlset>`;
  writeFileSync(join(__dirname, '../dist/web-ui/browser/sitemap.xml'), sitemapXml);
  if (changedPages.length) {
    log.info('Notifying IndexNow of Changes', changedPages);
    await indexNow(changedPages, link);
    if (process.env['GITHUB_OUTPUT']) {
      log.notice('Changes detected during build');
      writeFileSync(process.env['GITHUB_OUTPUT'], 'changes=true\n', { flag: 'a' });
    }
  } else if (process.env['GITHUB_OUTPUT']) {
    log.notice('No changes detected during build');
    writeFileSync(process.env['GITHUB_OUTPUT'], 'changes=false\n', { flag: 'a' });
  }
}

async function indexNow(pages: string[], link: string) {
  const apiUrl = 'https://api.indexnow.org/indexnow';

  const urls = pages.map(page => `${link.endsWith('/') ? link.slice(0, -1) : link}${page}`);
  const key = '89236caf22c246bab06048c2994304af';
  const body = {
    host: link,
    key: key,
    keyLocation: `${link.endsWith('/') ? link.slice(0, -1) : link}/${key}.txt`,
    urlList: urls
  };

  try {
    log.debug('Submitting URLs to IndexNow');
    log.debug(JSON.stringify(body, null, 2));
    if (ci) {
      // Instead of executing, output the curl command for a later job
      if (process.env['GITHUB_OUTPUT']) {
        const curlCmd = [
          //'curl', - will be present in the job
          '-X', 'POST',
          '-H', '"Content-Type: application/json"',
          '-d', `'${JSON.stringify(body)}'`,
          `"${apiUrl}"`
        ].join(' ');
        writeFileSync(process.env['GITHUB_OUTPUT'], `indexnow_curl=${curlCmd}\n`, { flag: 'a' });
        log.debug('Wrote curl command for IndexNow to GITHUB_OUTPUT');
      } else {
        log.error('GITHUB_OUTPUT not set, cannot output curl command');
      }
    } else {
      log.warn('Skipping IndexNow Submission Due To Local Deployment');
    }
  } catch (error) {
    log.error('Error preparing IndexNow curl command:', error);
  }
}

function robots(link?: string) {
  log.debug('Writing robots.txt');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/robots.txt'),
    `# Allow all URLs (see https://www.robotstxt.org/robotstxt.html)
User-agent: *
Disallow:${link ? `
Sitemap: ${link.endsWith('/') ? link.slice(0, -1) : link}/sitemap.xml` : ''}`);
}
function manifest() {
  let icons = true;
  if (!existsSync(join(__dirname, '../dist/web-ui/browser/assets/icons/'))) {
    log.error('ICONS DIRECTORY NOT FOUND');
    log.warn('↳ Excluding Icons From Manifest');
    icons = false;
    mkdirSync(join(__dirname, '../dist/web-ui/browser/assets/icons/'), { recursive: true });
  }
  log.debug('Writing Manifest');
  writeFileSync(join(__dirname, '../dist/web-ui/browser/assets/icons/site.webmanifest'), JSON.stringify({
    background_color: typeof config['colors'] == 'object' ? config['colors']['main'] : 'hsl(230, 100%, 10%)',
    description: config['homeDescription'],
    display: 'standalone',
    icons: icons ? [
      {
        src: './web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ] : [],
    name: config['homeTitle'],
    scope: url ? (url.toString().endsWith('/') ? url.toString() : url.toString() + '/') : undefined,
    short_name: config['tabTitle'],
    shortcuts: [
      {
        name: 'Home',
        url: './',
        icons: [
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Does',
        url: './does/',
      },
      {
        name: 'Bucks',
        url: './bucks/',
      }
    ].map(shortcut => {
      shortcut.url = url ? url.pathname + (url.pathname.endsWith('/') ? '' : '/') + shortcut.url.slice(2) : shortcut.url;
      return shortcut;
    }),
    start_url: url ? (url.pathname.endsWith('/') ? url.pathname : url.pathname + '/') : undefined,
    theme_color: typeof config['colors'] == 'object' ? config['colors']['secondary'] : 'hsl(230, 100%, 15%)'
  }, null, 2));
}
(async () => {
  log.info('Routing...');
  route();
  log.info('Rendering Markdown...');
  if (ci) {
    await setupMarkdown();
  } else {
    log.error('Skipping Markdown Rendering Due To Local Deployment');
  }
  log.info('Building...');
  build();
  log.info('Cleaning Up...');
  cleanup();
  log.info('Formatting 404...');
  format404();
  log.info('Generating Sitemap...');
  if (ci) {
    if (url) {
      await sitemap(url.toString());
    } else {
      log.error('NO URL FOUND IN CONFIG!');
      log.warn('↳ Skipping Sitemap Generation');
    }
  } else {
    log.error('Skipping Sitemap Generation Due To Local Deployment');
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
  log.info('Generating Manifest...');
  manifest();
  if (ci) {
    console.log('::endgroup::');
  }
  log.success('Done.');
})();
