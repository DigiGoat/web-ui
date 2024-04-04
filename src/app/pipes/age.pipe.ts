import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    try {
      if (!Date.parse(value)) {
        throw new Error('Failed to parse date');
      }
      const date = new Date(value);
      const dateDays = date.getTime() / (1000 * 3600 * 24);
      const now = new Date();
      const nowDays = now.getTime() / (1000 * 3600 * 24);
      if (date > now) {
        throw new Error('Provided date is in the future');
      }
      const formatter = new Intl.RelativeTimeFormat('en-us', { numeric: 'always' });

      /** Check if the date is within the past week */
      if (nowDays - dateDays < 7) {
        value = formatter.format(dateDays - nowDays, 'days').replace('ago', 'old');
        /** Check if the date is within the past 5 weeks */
      } else if (nowDays - dateDays < 7 * 5) {
        value = formatter.format(Math.trunc((dateDays - nowDays) / 7), 'weeks').replace('ago', 'old');
        /** Check if the date is within the past year */
      } else if (nowDays - dateDays < 365) {
        value = formatter.format(Math.trunc((dateDays - nowDays) / (365 / 12)), 'months').replace('ago', 'old');
        /** Everything else is more than 1 year */
      } else {
        value = formatter.format(Math.trunc((dateDays - nowDays) / 365), 'years').replace('ago', 'old');
      }
    } catch (e) {
      console.warn('Failed to parse age from date:', value, 'With error:', e);
    }
    return value;
  }

}
