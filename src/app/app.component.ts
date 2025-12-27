import { Component, type OnInit } from '@angular/core';

import { ConfigService } from './services/config/config.service';
import { CustomPagesService, CustomPageSummary } from './services/custom-pages/custom-pages.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  public customPages: CustomPageSummary[] = [];
  constructor(public config: ConfigService, private customPageService: CustomPagesService) { }
  ngOnInit(): void {
    this.customPages = this.customPageService.getPages();
  }
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
