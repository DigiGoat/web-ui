import { Injectable } from '@angular/core';
import { getAnalytics, logEvent, type Analytics } from 'firebase/analytics';
import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { initializePerformance, type FirebasePerformance } from 'firebase/performance';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app?: FirebaseApp;
  public analytics?: Analytics;
  public performance?: FirebasePerformance;
  constructor(private configService: ConfigService) { }

  init() {
    const firebaseConfig = this.configService.firebase as FirebaseOptions;
    if (firebaseConfig) {
      if (this.configService.analytics.gtag) {
        firebaseConfig['measurementId'] = this.configService.analytics.gtag;
      }
      this.app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(this.app);
      this.performance = initializePerformance(this.app);
    }
  }

  logEvent(eventName: string, params: Record<string, unknown>) {
    if (this.analytics) {
      logEvent(this.analytics, eventName, params);
    }
  }
}
