import { Component, ElementRef, type OnInit } from '@angular/core';

import { Meta } from '@angular/platform-browser';
import type { Observable } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { GoatService } from '../../services/goat/goat.service';
import { PlatformService } from '../../services/platform/platform.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public description = '';
  constructor(public config: ConfigService, private meta: Meta, private goatService: GoatService, private platformService: PlatformService, private el: ElementRef<HTMLElement>) { }
  ngOnInit(): void {
    this.description = this.config.homeDescription;
    this.setDescription();
  }
  htmlToPlainText(html: string): string {
    const doc = this.el.nativeElement.ownerDocument.createElement('div');
    doc.innerHTML = html;
    return doc.textContent || '';
  }
  setDescription(): void | Observable<void> {
    if (this.description) {
      this.meta.addTags([{ name: 'og:description', content: this.htmlToPlainText(this.description) }, { name: 'description', content: this.htmlToPlainText(this.description) }]);
    } else if (this.platformService.isServer) {
      let description = '';
      if (this.config.homeTitle && this.config.owner) {
        description += `${this.config.homeTitle} is owned and operated by ${this.config.owner}. `;
      }
      this.goatService.does.subscribe(does => {
        this.goatService.bucks.subscribe(bucks => {

          if (this.config.homeTitle) {
            if (this.config.owner) {
              description += `The herd is currently home to ${does.length} doe${does.length === 1 ? '' : 's'} and ${bucks.length} buck${bucks.length === 1 ? '' : 's'}. `;
            } else {
              description += `${this.config.homeTitle} is currently home to ${does.length} doe${does.length === 1 ? '' : 's'} and ${bucks.length} buck${bucks.length === 1 ? '' : 's'}. `;
            }
          } else {
            description += `The herd is currently home to ${does.length} doe${does.length === 1 ? '' : 's'} and ${bucks.length} buck${bucks.length === 1 ? '' : 's'}. `;
          }
          this.meta.addTags([{ name: 'og:description', content: description }, { name: 'description', content: description }]);
        });
      });
    }
  }
}
