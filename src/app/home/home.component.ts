import { Component } from '@angular/core';

import app from '../../assets/resources/app.json';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public app: AppService) { }
}
