import axios from 'axios';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Settings } from '../src/app/services/config/config.service';
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
const settings: Settings = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/settings.json'), 'utf-8'));
const customPages: { title: string; content: string; }[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/custom-pages.json'), 'utf-8'));
if (ci) {
  log.info('Applying Settings To Config...');
  if (process.env['GITHUB_OUTPUT'] && settings.firebase?.projectId) {
    log.notice('Firebase Project Configured');
    writeFileSync(process.env['GITHUB_OUTPUT'], `firebase_project=${settings.firebase.projectId}\n`, { flag: 'a' });
  }
  if (settings.firebase && (settings.firebase.apiKey && settings.firebase.appId && settings.firebase.messagingSenderId && settings.firebase.projectId)) {
    log.debug('Adding Firebase Config From Settings');
    config['firebase'] = {
      apiKey: settings.firebase.apiKey,
      authDomain: settings.firebase.authDomain || `${settings.firebase.projectId}.firebaseapp.com`,
      projectId: settings.firebase.projectId,
      storageBucket: settings.firebase.storageBucket || `${settings.firebase.projectId}.firebasestorage.app`,
      messagingSenderId: settings.firebase.messagingSenderId,
      appId: settings.firebase.appId,
    };
  } else if (config['firebase']) {
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
  if (settings.url) {
    if (URL.canParse(settings.url)) {
      log.debug(`Adding '${settings.url}' to the Config`);
      config['link'] = new URL(settings.url).toString();
    } else {
      log.error('ARGUMENT PROVIDED IS NOT A VALID URL');
      log.warn('↳ Using URL From Config');
    }
  } else if (process.argv[2]) {
    if (URL.canParse(process.argv[2])) {
      log.debug(`Adding '${process.argv[2]}' to the Config`);
      config['link'] = new URL(process.argv[2]).toString();
    } else {
      log.error('ARGUMENT PROVIDED IS NOT A VALID URL');
      log.warn('↳ Using URL From Config');
    }
  } else if (config['firebase'] && typeof config['firebase'] === 'object' && (config['firebase'] as Record<string, string>)['projectId']) {
    log.warn('NO URL PROVIDED, USING FIREBASE DEFAULT');
    const projectId = config['firebase']['projectId'];
    config['link'] = `https://${projectId}.web.app/`;
  }
  if (settings.analytics) {
    if (typeof config['analytics'] !== 'object') {
      config['analytics'] = {};
    }
    if (settings.analytics.gtag) {
      log.debug('Adding Google Analytics Config From Settings');
      config['analytics']['gtag'] = settings.analytics.gtag;
    }
    if (settings.analytics.clarity) {
      log.debug('Adding Microsoft Clarity Config From Settings');
      config['analytics']['clarity'] = settings.analytics.clarity;
    }
  }
  log.debug('Writing Updated Config');
  writeFileSync(join(__dirname, '../src/assets/resources/config.json'), JSON.stringify(config));
} else {
  log.warn('Skipping Settings Application Due To Local Run');
}

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
  if (customPages.length) {
    log.debug('Writing Custom Page Routes');
    customPages.forEach(page => {
      const route = `/${page.title.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`;
      log.debug(`Adding Custom Page Route '${route}'`);
      routes.push(route);
    });
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
  if (customPages.length) {
    log.debug('Rendering Markdown For Custom Pages');
    for (const page of customPages) {
      if (page.content) {
        log.debug(`Rendering Markdown For Custom Page ${page.title}`);
        page.content = await renderMarkdown(page.content);
      }
    }
    writeFileSync(join(__dirname, '../src/assets/resources/custom-pages.json'), JSON.stringify(customPages));
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
  const previousDeploySitemapPath = join(__dirname, '../previous-deploy/browser/sitemap.json');

  function scanDirectory(directory: string) {
    const items = readdirSync(directory);
    items.forEach(item => {
      const fullPath = join(directory, item);
      if (lstatSync(fullPath).isDirectory() && !item.includes('Not-Found') && !item.includes('Kidding-Goat')) {
        scanDirectory(fullPath);
      } else if (item === 'index.html') {
        const sitemapEntry = fullPath.replace(rootDir, '').replace('index.html', '');
        log.debug(`Adding Page '${sitemapEntry}'`);
        sitemap.push(sitemapEntry);
      }
    });
  }

  scanDirectory(rootDir);
  log.debug('Loading Old Sitemap');
  let oldSitemap: Record<string, string> = {};
  let usedArtifact = false;
  if (existsSync(previousDeploySitemapPath)) {
    try {
      log.debug(`Reading previous deploy sitemap from: ${previousDeploySitemapPath}`);
      const previousDeploySitemapContent = readFileSync(previousDeploySitemapPath, 'utf-8');
      const parsed = JSON.parse(previousDeploySitemapContent) as unknown;
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        oldSitemap = parsed as Record<string, string>;
        usedArtifact = true;
      } else {
        log.warn('Previous deploy sitemap.json is not an object, falling back to HTTP fetch.');
      }
    } catch (error) {
      log.warn('Failed to read/parse previous deploy sitemap.json, falling back to HTTP fetch.');
      log.debug(error);
    }
  }
  if (!usedArtifact) {
    try {
      log.debug(`Fetching old sitemap from: ${link}/sitemap.json`);
      const response = await axios.get(`${link}/sitemap.json`);
      const data = response.data as unknown;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        oldSitemap = data as Record<string, string>;
      } else {
        log.warn('Fetched sitemap.json is not an object; treating as empty and generating a new sitemap.');
      }
    } catch (error) {
      log.error('Failed to fetch old sitemap:', error);
      log.warn('↳ Generating New Sitemap');
    }
  }
  log.debug(`Old sitemap source: ${usedArtifact ? 'artifact' : 'http'}`);
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
    let oldOGMetaDescription: string | null = null;
    let usedArtifact = false;

    if (existsSync(prevPagePath)) {
      log.debug(`Reading previous deploy content from: ${prevPagePath}`);
      const prevPageContent = readFileSync(prevPagePath, 'utf-8');
      const oldTitleMatch = prevPageContent.match(/<title>(.*?)<\/title>/);
      const oldMetaDescriptionMatch = prevPageContent.match(/<meta name="description" content="(.*?)"/);
      const oldOGMetaDescriptionMatch = prevPageContent.match(/<meta property="og:description" content="(.*?)"/);
      oldTitle = oldTitleMatch ? oldTitleMatch[1] : null;
      oldMetaDescription = oldMetaDescriptionMatch ? oldMetaDescriptionMatch[1] : null;
      oldOGMetaDescription = oldOGMetaDescriptionMatch ? oldOGMetaDescriptionMatch[1] : null;
      usedArtifact = true;
    } else {
      log.warn(`Previous deploy file not found for page: ${page}, falling back to HTTP fetch.`);
      try {
        log.debug(`Fetching page: ${fullPageUrl}`);
        const response = await axios.get(fullPageUrl);
        const oldTitleMatch = response.data.match(/<title>(.*?)<\/title>/);
        const oldMetaDescriptionMatch = response.data.match(/<meta name="description" content="(.*?)"/);
        const oldOGMetaDescriptionMatch = response.data.match(/<meta property="og:description" content="(.*?)"/);
        oldTitle = oldTitleMatch ? oldTitleMatch[1] : null;
        oldMetaDescription = oldMetaDescriptionMatch ? oldMetaDescriptionMatch[1] : null;
        oldOGMetaDescription = oldOGMetaDescriptionMatch ? oldOGMetaDescriptionMatch[1] : null;
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
    const newOGMetaDescriptionMatch = newPageContent.match(/<meta property="og:description" content="(.*?)"/);
    const ogImageMatches = newPageContent.matchAll(/<meta property="og:image" content="(.+?)"/g);

    const newTitle = newTitleMatch ? newTitleMatch[1] : null;
    const newMetaDescription = newMetaDescriptionMatch ? newMetaDescriptionMatch[1] : null;
    const newOGMetaDescription = newOGMetaDescriptionMatch ? newOGMetaDescriptionMatch[1] : null;
    const ogImages = Array.from(ogImageMatches).map(match => match[1]);
    imageSitemap[page] = ogImages;

    const normalizeDescriptionForCompare = (description: string | null): string | null => {
      if (!description) {
        return description;
      }
      // Many pages start with: "As of MONTH, YEAR, ..." so search results show freshness.
      // For change detection, ignore that prefix if present so it doesn't constantly bump lastmod.
      // Heuristic: if the string begins with "As of" and has at least 2 commas, compare only after the 2nd comma.
      if (!description.toLowerCase().startsWith('as of')) {
        return description;
      }
      const firstComma = description.indexOf(',');
      if (firstComma === -1) {
        return description;
      }
      const secondComma = description.indexOf(',', firstComma + 1);
      if (secondComma === -1) {
        return description;
      }
      return description.slice(secondComma + 1).trimStart();
    };

    if (oldTitle === newTitle && normalizeDescriptionForCompare(oldMetaDescription) === normalizeDescriptionForCompare(newMetaDescription) && oldOGMetaDescription === newOGMetaDescription) {
      log.debug(`No changes detected for page: ${page} (${usedArtifact ? 'artifact' : 'http'})`);
      newSitemap[page] = oldSitemap[page] || new Date().toISOString();
    } else {
      log.debug(`Changes detected for page: ${page} (${usedArtifact ? 'artifact' : 'http'})`);
      log.debug(oldTitle !== newTitle ? `- Title changed from '${oldTitle}' to '${newTitle}'` : '- Title unchanged');
      log.debug(normalizeDescriptionForCompare(oldMetaDescription) !== normalizeDescriptionForCompare(newMetaDescription) ? `- Meta description changed from '${normalizeDescriptionForCompare(oldMetaDescription)}' to '${normalizeDescriptionForCompare(newMetaDescription)}'` : '- Meta description unchanged');
      log.debug(oldOGMetaDescription !== newOGMetaDescription ? `- OG meta description changed from '${oldOGMetaDescription}' to '${newOGMetaDescription}'` : '- OG meta description unchanged');
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
        writeFileSync(process.env['GITHUB_OUTPUT'], `indexnow_curl=${JSON.stringify(body).replace(/"/g, '\\"')}\n`, { flag: 'a' });
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
Disallow: /does/Doe-Not-Found
Disallow: /bucks/Buck-Not-Found
Disallow: /references/Reference-No-Found
Disallow: /for-sale/Goat-Not-Found
Disallow: /kidding-schedule/Kidding-Goat
${link ? `Sitemap: ${link.endsWith('/') ? link.slice(0, -1) : link}/sitemap.xml` : ''}`);
}
function manifest() {
  let icons = true;
  if (!existsSync(join(__dirname, '../dist/web-ui/browser/assets/icons/'))) {
    log.error('ICONS DIRECTORY NOT FOUND');
    log.warn('↳ Excluding Icons From Manifest');
    icons = false;
    mkdirSync(join(__dirname, '../dist/web-ui/browser/assets/icons/'), { recursive: true });
  }
  const config = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
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
    name: config['title'] || config['homeTitle'] || config['menubarTitle'],
    scope: url ? (url.toString().endsWith('/') ? url.toString() : url.toString() + '/') : undefined,
    short_name: config['shortTitle'] || config['tabTitle'],
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
