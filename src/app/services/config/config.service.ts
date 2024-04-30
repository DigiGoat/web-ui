import { Injectable } from '@angular/core';

import config from '../../../assets/resources/config.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Record<string, string> = config;
  get homeTitle(): string {
    if (this.config['homeTitle']) {
      return this.config['homeTitle'];
    }
    return '';
  }
  get owner(): string {
    if (this.config['owner']) {
      return this.config['owner'];
    }
    return '';
  }
  get email(): string {
    if (this.config['email']) {
      return this.config['email'];
    }
    return '';
  }
  get homeDescription(): string {
    if (this.config['homeDescription']) {
      return this.config['homeDescription'];
    }
    return '';
  }
  get repo(): string {
    if (this.config['repo']) {
      return this.config['repo'];
    }
    return '';
  }
  get menubarTitle(): string {
    if (this.config['menubarTitle']) {
      return this.config['menubarTitle'];
    }
    return '';
  }
  get tabTitle(): string {
    if (this.config['tabTitle']) {
      return this.config['tabTitle'];
    }
    return '';
  }
  get link(): string {
    if (this.config['link']) {
      return this.config['link'];
    }
    return '';
  }
}
