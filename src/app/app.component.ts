import { Component } from '@angular/core';

import defaults from '../assets/resources/_app.json';
import app from '../assets/resources/app.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private app: Record<string, any> = app;
  private defaults = defaults;
  menubarTitle = this.app['menubarTitle'] ?? this.defaults.menubarTitle;
  owner = this.app['owner'] || this.defaults.owner;
  email = this.app['email'] || this.defaults.email;
  repo = this.app['repo'] || this.defaults.repo;
}
