import { Injectable } from '@angular/core';

import config from '../../../assets/resources/config.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Record<string, string | boolean | Record<string, string | Record<string, string>>> = config;
  get homeTitle(): string {
    if (this.config['homeTitle']) {
      return this.config['homeTitle'] as string;
    }
    return '';
  }
  get owner(): string {
    if (this.config['owner']) {
      return this.config['owner'] as string;
    }
    return '';
  }
  get email(): string {
    if (this.config['email']) {
      return this.config['email'] as string;
    }
    return '';
  }
  get homeDescription(): string {
    if (this.config['homeDescription']) {
      return this.config['homeDescription'] as string;
    }
    return '';
  }
  get menubarTitle(): string {
    if (this.config['menubarTitle']) {
      return this.config['menubarTitle'] as string;
    }
    return '';
  }
  get tabTitle(): string {
    if (this.config['tabTitle']) {
      return this.config['tabTitle'] as string;
    }
    return '';
  }
  get link(): string {
    if (this.config['link']) {
      return `${this.config['link']}${(this.config['link'] as string).endsWith('/') ? '' : '/'}`;
    }
    return '';
  }
  get analytics(): Analytics {
    if (this.config['analytics']) {
      return this.config['analytics'] as Analytics;
    }
    return {};
  }
  get colors(): ColorScheme {
    if (this.config['colors']) {
      return this.config['colors'] as ColorScheme;
    }
    return {};
  }
  get kiddingSchedule(): boolean {
    if (this.config['kiddingSchedule']) {
      return this.config['kiddingSchedule'] as boolean;
    }
    return false;
  }
  get socials(): Socials {
    if (this.config['socials']) {
      return this.config['socials'] as Socials;
    }
    return {};
  }
  get references(): boolean {
    if (this.config['references']) {
      return this.config['references'] as boolean;
    }
    return false;
  }
}

type Analytics = { gtag?: string, clarity?: string; };
type ColorScheme = {
  background?: 'wood';
  main?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  light?: {
    main?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
  };
};
type Socials = { facebook?: string, instagram?: string, threads?: string; };
