import CDCB, { LactationType } from 'adga/CDCB';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path/posix';
import { Goat, type LactationRecord } from '../src/app/services/goat/goat.service';

const cdcb = new CDCB();
const ci = !!process.env['CI'];
if (ci) {
  console.log('::group::Starting Sync');
}
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

async function syncDoes() {
  const does: Goat[] = JSON.parse(readFileSync(join(__dirname, '../src/assets/resources/does.json'), 'utf-8'));
  for (const doe of does) {
    if (doe.usdaId && doe.usdaKey) {
      log.debug(`Syncing Lactations for ${doe.nickname || doe.name || doe.normalizeId} (${doe.usdaId})`);
      doe.lactationRecords = await getLactations(doe.usdaId, doe.usdaKey);
    } else {
      log.warn(`Skipping ${doe.nickname || doe.name || doe.normalizeId} - Missing USDA ID or Key`);
    }
  }
}

(async () => {
  log.info('Syncing Doe Lactations');
  await syncDoes();
  if (ci) {
    console.log('::endgroup::');
  }
  log.success('Done.');
})();
