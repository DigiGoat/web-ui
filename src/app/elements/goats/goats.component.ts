import type { HttpErrorResponse } from '@angular/common/http';

import { Component, Input, OnInit } from '@angular/core';


import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { findMatch, type Goat } from '../../services/goat/goat.service';
import { PlatformService } from '../../services/platform/platform.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.scss'],
  standalone: false
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
          this.activeGoatIndex = findMatch(this.searchParam, this.goats);
        } else {
          this.setDescription();
        }
      },
      error: err => this.err = err
    });
  }
  setDescription() {
    const datePipe = new DatePipe('en-US');
    let description = `As of ${datePipe.transform(new Date())}, `;
    if (this.configService.title) {
      description += this.configService.title;
      description += ` is currently home to ${this.goats?.length} ${(this.goats?.length === 1 ? this.name.slice(0, -1) : this.name).toLowerCase()}: `;
    } else {
      description += `The herd is currently home to ${this.goats?.length} ${(this.goats?.length === 1 ? this.name.slice(0, -1) : this.name).toLowerCase()}: `;
    }
    if (this.goats && this.goats.length > 0) {
      const goatNames = this.goats.filter(goat => goat.name || goat.nickname).map(goat => goat.nickname || goat.name);
      description += goatNames.length > 1
        ? `${goatNames.slice(0, -1).join(', ')}${goatNames.length > 2 ? ',' : ''} and ${goatNames[goatNames.length - 1]}`
        : goatNames[0];
    }
    this.meta.addTags([{ property: 'og:description', content: description }, { name: 'description', content: description }]);
  }
}
