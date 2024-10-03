import type { HttpErrorResponse } from '@angular/common/http';
import { Goat } from 'src/app/services/goat/goat.service';

import { Component, Input, OnInit } from '@angular/core';


import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { AgePipe } from '../../pipes/age/age.pipe';
import { ConfigService } from '../../services/config/config.service';
import { PlatformService } from '../../services/platform/platform.service';


@Component({
  selector: 'app-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.scss']
})
export class GoatsComponent implements OnInit {
  public err?: HttpErrorResponse;
  public noGoats = false;
  public activeGoatIndex = -1;
  public prerender = false;
  public bot = false;
  public searchParam?: string;
  constructor(public route: ActivatedRoute, private platformService: PlatformService, private configService: ConfigService, private meta: Meta) {
  }
  public goats?: Goat[];
  @Input({ required: true, alias: 'goats' }) getter!: Observable<Goat[]>;
  @Input({ required: true }) name!: string;
  ngOnInit() {
    this.prerender = this.platformService.isServer;
    this.bot = this.platformService.isBot;
    this.searchParam = this.route.snapshot.params['goat'];
    this.getter.subscribe({
      next: goats => {
        if (!goats.length) {
          this.noGoats = true;
        }
        this.goats = goats;
        if (this.searchParam) {
          this.activeGoatIndex = this.goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].includes(this.searchParam));
          if (this.activeGoatIndex === -1) {
            this.activeGoatIndex = this.goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase()).includes(this.searchParam?.toLowerCase()));
          }
          if (this.activeGoatIndex === -1) {
            this.searchParam = this.searchParam.replace(/-/g, ' ');
            this.activeGoatIndex = this.goats?.findIndex(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase().replace(/-/g, ' ')).includes(this.searchParam?.toLowerCase()));
          }
        } else {
          this.setDescription();
        }
      },
      error: err => this.err = err
    });
  }
  setDescription() {
    let description = '';
    if (this.configService.homeTitle) {
      description += this.configService.homeTitle;
      description += ` is currently home to ${this.goats?.length} ${(this.goats?.length === 1 ? this.name.slice(0, -1) : this.name).toLowerCase()}. `;
    } else {
      description += `The herd is currently home to ${this.goats?.length} ${(this.goats?.length === 1 ? this.name.slice(0, -1) : this.name).toLowerCase()}. `;
    }
    if (this.goats && this.goats.length > 0) {
      const agePipe = new AgePipe();
      const goatNames = this.goats.map(goat => {
        let info = '';
        if (goat.name) {
          info += goat.name;
          if (goat.nickname && goat.dateOfBirth) {
            info += ` ("${goat.nickname}" - ${agePipe.transform(goat.dateOfBirth)})`;
          } else if (goat.nickname) {
            info += ` ("${goat.nickname}")`;
          } else if (goat.dateOfBirth) {
            info += ` (${agePipe.transform(goat.dateOfBirth)})`;
          }
        } else if (goat.nickname) {
          info += goat.nickname;
          if (goat.dateOfBirth) {
            info += ` (${agePipe.transform(goat.dateOfBirth)})`;
          }
        }
        return info;
      }).filter(name => name);
      const formattedGoatNames = goatNames.length > 1
        ? `${goatNames.slice(0, -1).join(', ')}${goatNames.length > 2 ? ',' : ''} and ${goatNames[goatNames.length - 1]}`
        : goatNames[0];
      description += `This includes: ${formattedGoatNames}`;
    }
    this.meta.addTags([{ name: 'og:description', content: description }, { name: 'description', content: description }]);
  }
}
