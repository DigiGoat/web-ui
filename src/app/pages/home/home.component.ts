import { Component } from '@angular/core';

import { AppService } from '../../services/config/config.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public app: AppService) { }
}
