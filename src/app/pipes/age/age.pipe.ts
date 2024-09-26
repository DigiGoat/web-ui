import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): string {
    try {
      if (!Date.parse(value)) {
        throw new Error('Failed to parse date');
      }
      /** The targeted date in days */
      const date = Date.parse(value) / (1000 * 3600 * 24);
      /** The current date in days */
      const now = Date.now() / (1000 * 3600 * 24);
      const difference = now - date;
      if (difference < 0) {
        throw new Error('Provided date is in the future');
      }

      /** Check if the date is within the past week */
      if (difference < 7) {
        const days = Math.trunc(difference);
        value = `${days} day${days > 1 ? 's' : ''} old`;
        /** Check if the date is within the past 5 weeks */
      } else if (difference < 7 * 5) {
        const weeks = Math.trunc(difference / 7);
        value = `${weeks} week old`;
        /** Check if the date is within the past year */
      } else if (difference < 365) {
        const months = Math.trunc(difference / (365 / 12));
        value = `${months} month old`;
        /** Everything else is more than 1 year */
      } else {
        const years = Math.trunc(difference / 365);
        value = `${years} year old`;
      }
    } catch (e) {
      console.warn('Failed to parse age from date:', value, 'With error:', e);
    }
    return value;
  }

}
