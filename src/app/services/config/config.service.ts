import { Injectable } from '@angular/core';

import config from '../../../assets/resources/config.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Record<string, any> = config;
  get homeTitle(): string {
    if (this.config['homeTitle']) {
      return this.config['homeTitle'];
    } else {
      return 'Dairy Goat Farm';
    }
  };
  get owner(): string {
    if (this.config['owner']) {
      return this.config['owner'];
    } else {
      return 'First & Last Name';
    }
  }
  get email(): string {
    if (this.config['email']) {
      return this.config['email'];
    } else {
      return 'someone@email.com';
    }
  }
  get homeDescription(): string {
    if (this.config['homeDescription']) {
      return this.config['homeDescription'];
    } else {
      return 'Our Farm is home to ...';
    }
  }
  get repo(): string {
    if (this.config['repo']) {
      return this.config['repo'];
    } else {
      return 'https://github.com/DigiGoat/your-website';
    }
  }
  get menubarTitle(): string {
    if (this.config['menubarTitle']) {
      return this.config['menubarTitle'];
    } else {
      return 'Dairy Goat <br> Farm';
    }
  }
  get tabTitle(): string {
    if (this.config['tabTitle']) {
      return this.config['tabTitle'];
    } else {
      return 'Dairy Goat Farm';
    }
  }
}
