import { Component } from '@angular/core';

import { ConfigService } from './services/config/config.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(public config: ConfigService) { }
  splitString(string: string) {
    const splitString = string.split(' ');
    if (splitString.length > 1) {
      const half = Math.floor(splitString.length / 2);
      const firstHalf = splitString.slice(0, half).join(' ');
      const secondHalf = splitString.slice(half).join(' ');
      return `${firstHalf}<br>${secondHalf}`;
    } else {
      return splitString[0];
    }
  }
}
