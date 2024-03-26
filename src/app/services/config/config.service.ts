import { Injectable } from '@angular/core';

import defaults from '../../../assets/resources/config.defaults.json';
import config from '../../../assets/resources/config.json';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private config: Record<string, any> = config;
  private defaults = defaults.pop()!;
  get homeTitle(): string {
    if (this.config['homeTitle']) {
      return this.config['homeTitle'];
    } else {
      return this.defaults.homeTitle;
    }
  };
  get owner(): string {
    if (this.config['owner']) {
      return this.config['owner'];
    } else {
      return this.defaults.owner;
    }
  }
  get email(): string {
    if (this.config['email']) {
      return this.config['email'];
    } else {
      return this.defaults.email;
    }
  }
  get homeDescription(): string {
    if (this.config['homeDescription']) {
      return this.config['homeDescription'];
    } else {
      return this.defaults.homeDescription;
    }
  }
  get repo(): string {
    if (this.config['repo']) {
      return this.config['repo'];
    } else {
      return this.defaults.repo;
    }
  }
  get menubarTitle(): string {
    if (this.config['menubarTitle']) {
      return this.config['menubarTitle'];
    } else {
      return this.defaults.menubarTitle;
    }
  }
}
