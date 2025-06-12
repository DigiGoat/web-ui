import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freshening',
  standalone: false
})
export class FresheningPipe implements PipeTransform {

  transform(value?: string | number): string {
    if (value === undefined || value === null || value === '') {
      return '';
    }
    const freshening = Number(value);
    switch (freshening) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      default:
        return `${freshening}th`;
    }
  }

}
