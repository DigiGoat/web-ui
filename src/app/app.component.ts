import { Component } from '@angular/core';

import { ConfigService } from './services/config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public app: ConfigService) { }
}
