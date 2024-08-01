import type { HttpErrorResponse } from '@angular/common/http';
import { Goat } from 'src/app/services/goat/goat.service';

import { Component, Input, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
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
  constructor(public route: ActivatedRoute, private platformService: PlatformService) {
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
        }
      },
      error: err => this.err = err
    });
  }
}
