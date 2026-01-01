import { Injectable } from '@angular/core';

import config from '../../../assets/resources/config.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: Record<string, string | boolean | Record<string, string | Record<string, string>>> = config;
  get title(): string {
    if (this.config['title']) {
      return this.config['title'] as string;
    } else if (this.config['homeTitle']) {
      return this.config['homeTitle'] as string;
    } else if (this.config['menubarTitle']) {
      return this.config['menubarTitle'] as string;
    }
    return '';
  }
  get shortTitle(): string {
    if (this.config['shortTitle']) {
      return this.config['shortTitle'] as string;
    } else if (this.config['tabTitle']) {
      return this.config['tabTitle'] as string;
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
  get kiddingScheduleDescription(): string {
    if (this.config['kiddingScheduleDescription']) {
      return this.config['kiddingScheduleDescription'] as string;
    }
    return '';
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
  get forSale(): boolean {
    if (this.config['forSale']) {
      return this.config['forSale'] as boolean;
    }
    return false;
  }
  get saleTerms(): string {
    if (this.config['saleTerms']) {
      return this.config['saleTerms'] as string;
    }
    return '';
  }
  get firebase(): Firebase | false {
    if (this.config['firebase'] && typeof this.config['firebase'] === 'object') {
      // Make sure alll firebase keys are present
      if (!this.config['firebase']['apiKey'] || !this.config['firebase']['projectId'] || !this.config['firebase']['messagingSenderId'] || !this.config['firebase']['appId']) {
        console.error('Missing Firebase keys');
        return false;
      }
      const config = this.config['firebase'] as Firebase;
      config.authDomain = config.authDomain || `${config.projectId}.firebaseapp.com`;
      config.storageBucket = config.storageBucket || `${config.projectId}.firebasestorage.app`;
      return config;
    }
    return false;
  }
}

type Analytics = { gtag?: string; clarity?: string };
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
type Socials = { facebook?: string; instagram?: string; threads?: string };
type Firebase = { apiKey?: string; authDomain?: string; projectId?: string; storageBucket?: string; messagingSenderId?: string; appId?: string };

export type Settings = Partial<{
  analytics: Partial<{
    gtag: string;
    clarity: string;
  }>;
  firebase: Partial<{
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }>;
  url: string;
}>;
