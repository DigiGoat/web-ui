import { Component } from '@angular/core';

import defaults from '../../assets/resources/_app.json';
import app from '../../assets/resources/app.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private app: Record<string, any> = app;
  private defaults = defaults;
  homeTitle = this.app['homeTitle'] || this.defaults.homeTitle;
  owner = this.app['owner'] || this.defaults.owner;
  email = this.app['email'] || this.defaults.email;
  homeDescription = this.app['homeDescription'] || this.defaults.homeDescription;
}
