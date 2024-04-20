import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  public isServer = isPlatformServer(this.platformId);
  public isBrowser = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID)
  private platformId: any) { }
}
