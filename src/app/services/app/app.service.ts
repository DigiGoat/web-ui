import { Injectable } from '@angular/core';

import defaults from '../../../assets/resources/_app.json';
import app from '../../../assets/resources/app.json';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private app: Record<string, any> = app ?? {};
  private defaults = defaults.pop()!;
  get homeTitle(): string {
    if (this.app['homeTitle']) {
      return this.app['homeTitle'];
    } else {
      return this.defaults.homeTitle;
    }
  };
  get owner(): string {
    if (this.app['owner']) {
      return this.app['owner'];
    } else {
      return this.defaults.owner;
    }
  }
  get email(): string {
    if (this.app['email']) {
      return this.app['email'];
    } else {
      return this.defaults.email;
    }
  }
  get homeDescription(): string {
    if (this.app['homeDescription']) {
      return this.app['homeDescription'];
    } else {
      return this.defaults.homeDescription;
    }
  }
  get repo(): string {
    if (this.app['repo']) {
      return this.app['repo'];
    } else {
      return this.defaults.repo;
    }
  }
  get menubarTitle(): string {
    if (this.app['menubarTitle']) {
      return this.app['menubarTitle'];
    } else {
      return this.defaults.menubarTitle;
    }
  }
}
