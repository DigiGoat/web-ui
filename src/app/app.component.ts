import { Component } from '@angular/core';

import { ConfigService } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public app: ConfigService) { }
  splitString(string: string) {
    const splitString = string.split(' ');
    const half = Math.floor(splitString.length / 2);
    const firstHalf = splitString.slice(0, half).join(' ');
    const secondHalf = splitString.slice(half).join(' ');
    return `${firstHalf}<br>${secondHalf}`;
  }
}
