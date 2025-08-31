import CDCB, { LactationType } from 'adga/CDCB';
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
//@ts-expect-error The types for nodemailer break the angular compilation
import { createTransport } from 'nodemailer';
import { join } from 'path/posix';
import { Goat, type LactationRecord } from '../src/app/services/goat/goat.service';

const cdcb = new CDCB();
const ci = !!process.env['CI'];
if (ci) {
  console.log('::group::Starting Sync');
}
const config = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/config.json'), 'utf-8'));
const log = {
  debug: (...message: unknown[]): void => console.debug(chalk.dim('>', ...message)),
  info: (...message: unknown[]): void => ci ? console.log(`::endgroup::\n::group::${message.shift()}\n`, ...message) : console.log(...message),
  warn: (...message: unknown[]): void => console.warn(`${ci ? '::warning::' : ''}${chalk.yellowBright(...message)}`),
  error: (...message: unknown[]): void => console.error(`${ci ? '::error::' : ''}${chalk.redBright(...message)}`),
  success: (...message: unknown[]): void => console.log(chalk.greenBright(...message)),
  notice: (...message: unknown[]): void => console.log(ci ? '::notice::' : '', chalk.cyanBright(...message)),
};
async function getLactations(usdaId: string, animalKey: string | number) {
  try {
    const lactations = await cdcb.getAnimalLactations(usdaId, animalKey);
    // Run all per-lactation requests in parallel, preserving order
    const records: LactationRecord[] = await Promise.all(
      lactations.map(async (lactation) => {
        const lactationTests = await cdcb.getLactationsTestDate(usdaId, animalKey, lactation.calvPdate, lactation.herdCode);
        const stats: LactationRecord['stats'] = { milk: {}, butterfat: {}, protein: {} };
        for (const stat of lactationTests.lactationStds) {
          if (stat.typeName === 'Actual') {
            stats.milk!.projected = stat.mlk;
            stats.butterfat!.projected = stat.fat;
            stats.protein!.projected = stat.pro;
          } else if (stat.typeName === 'Standard') {
            stats.milk!.achieved = stat.mlk;
            stats.butterfat!.achieved = stat.fat;
            stats.protein!.achieved = stat.pro;
          }
        }
        const tests: LactationRecord['tests'] = [];
        for (const test of lactationTests.testDates) {
          tests.push({
            testNumber: test.testNo,
            testDate: test.testDate,
            milk: test.milk,
            butterfatPct: test.fatPct,
            proteinPct: test.proPct,
            daysInMilk: test.dim,
          });
        }
        const record: LactationRecord = {
          startDate: lactation.freshDate,
          isCurrent: lactation.lt === LactationType.IN_PROGRESS,
          lactationNumber: lactation.lactNum,
          daysInMilk: lactation.dim,
          stats: stats,
          tests: tests,
        };
        return record;
      })
    );
    // CDCB returns lactations in reverse order, so reverse to match original unshift logic
    return records.reverse();
  } catch (err) {
    console.warn('Error Fetching Lactations:', err);
  }
}

const changes: string[] = [`<h1>Lactation Records Updated${(config['title'] || config['shortTitle']) ? ` For ${config['title'] || config['shortTitle']}` : ''}</h1>`];

async function syncDoes() {
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  for (const doe of does) {
    if (doe.usdaId && doe.usdaKey) {
      log.info(`Syncing Lactations for ${doe.nickname || doe.name || doe.normalizeId} (${doe.usdaId})`);
      const lactationCount = doe.lactationRecords?.length || 0;
      const testCount = doe.lactationRecords?.find(lactation => lactation.isCurrent)?.tests?.length || 0;
      log.debug(`${doe.nickname || doe.name || doe.normalizeId} currently has ${lactationCount} lactation records with ${testCount} tests for her current lactation`);
      doe.lactationRecords = await getLactations(doe.usdaId, doe.usdaKey);
      const newLactationCount = doe.lactationRecords?.length || 0;
      const newTestCount = doe.lactationRecords?.find(lactation => lactation.isCurrent)?.tests?.length || 0;
      log.debug(`${doe.nickname || doe.name || doe.normalizeId} now has ${newLactationCount} lactation records with ${newTestCount} tests for her current lactation`);
      if (lactationCount !== newLactationCount || testCount !== newTestCount) {
        changes.push(`<h3>Updated lactation records for ${doe.nickname || doe.name || doe.normalizeId} (${doe.usdaId})</h3>`);
        if (lactationCount !== newLactationCount) {
          changes.push(`<p>Added ${newLactationCount - lactationCount} lactation records</p>`);
        }
        if (testCount !== newTestCount) {
          changes.push(`<p>Added ${newTestCount - testCount} tests</p>`);
        }
        if (config['link']) {
          const url = new URL(`./does/${doe.id}`, config['link']);
          changes.push(`<p>View the updated records at <a href="${url}">${url}</a></p>`);
        }
      }
    } else {
      log.warn(`Skipping ${doe.nickname || doe.name || doe.normalizeId} - Missing USDA ID or Key`);
    }
  }
  writeFileSync(join(__dirname, '../src/assets/resources/does.json'), JSON.stringify(does, null, 2));
}

(async () => {
  log.info('Syncing Doe Lactations');
  await syncDoes();
  if (changes.length > 1) {
    log.info('Lactation records updated, notifying changes');
    if (ci) {
      await notifyChanges();
    } else {
      log.warn('Changes detected but running locally, skipping notification');
    }
  }
  if (ci) {
    console.log('::endgroup::');
  }
  log.success('Done.');
})();

async function notifyChanges() {
  const email = config['email'];
  if (!email) {
    log.error('No email configured');
    log.warn('Set the "email" field in config.json to enable email notifications');
    return;
  }
  log.debug('Creating transporter...');
  // Create a test account or replace with real credentials.
  const transporter = createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: 'digigoat@lilpilchuckcreek.org',
      pass: process.env['EMAIL_PASSWORD'] || '',
    },
  });
  log.info('Sending email to', email);
  await transporter.sendMail({
    from: '"DigiGoat" <digigoat@lilpilchuckcreek.org>',
    sender: 'digigoat@lilpilchuckcreek.org',
    to: email,
    subject: `${(config['title'] || config['shortTitle']) ? `[${config['title'] || config['shortTitle']}] ` : ''}Lactation Records Updated`,
    text: changes.join('\n').replace(/<[^>]*>/g, ''), // plain‑text body
    html: changes.join('\n'), // HTML body
  });
  log.success('Email sent to', email);
}
