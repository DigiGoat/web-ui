import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isbot } from 'isbot';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  public isServer = isPlatformServer(this.platformId);
  public isBrowser = isPlatformBrowser(this.platformId);
  public isBot = this.isBrowser && isbot(navigator.userAgent);

  constructor(@Inject(PLATFORM_ID)
  private platformId: object) { }
}
