import type { HttpErrorResponse } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import type { Page } from '../../app-routing.module';
import { ConfigService } from '../../services/config/config.service';
import { findMatch, GoatService, type Goat, type Kidding } from '../../services/goat/goat.service';

@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrl: './kidding-schedule.component.scss',
  standalone: false
})
export class KiddingScheduleComponent implements OnInit, Page {
  schedule?: Kidding[];

  public err?: HttpErrorResponse;
  public noSchedule = false;
  public does?: Goat[];
  public bucks?: Goat[];
  public references?: Goat[];
  public activeGoat?: Goat;
  public searchParam?: string;
  public activeIndex?: number;

  public pageDescription = 'Click on a Goat Below For More Info';
  public saleTerms?: string;

  constructor(private goatService: GoatService, private route: ActivatedRoute, private meta: Meta, private configService: ConfigService) { }
  setDescription() {
    let description = '';
    if (this.configService.title) {
      description += this.configService.title;
      description += ` Currently Has ${this.schedule?.length} Kiddings Scheduled`;
    } else {
      description += `The Farm Currently Has ${this.schedule?.length} Kiddings Scheduled`;
    }
    this.meta.addTags([{ property: 'og:description', content: description }, { name: 'description', content: description }]);
  }

  ngOnInit() {
    this.searchParam = this.route.snapshot.params['goat'];
    this.goatService.kidding.subscribe({
      next: data => {
        this.schedule = data;
        if (!data.length) {
          this.noSchedule = true;
        } else if (!this.searchParam) {
          this.setDescription();
        }
      },
      error: err => this.err = err
    });
    this.goatService.does.subscribe({
      next: does => {
        this.does = does;
        this.determineActiveGoat(does);
      }
    });
    this.goatService.bucks.subscribe({
      next: bucks => {
        this.bucks = bucks;
        this.determineActiveGoat(bucks);
      }
    });
    this.goatService.references.subscribe({
      next: references => {
        this.references = references;
        this.determineActiveGoat(references);
      }
    });

    if (this.configService.kiddingScheduleDescription) {
      this.pageDescription = this.configService.kiddingScheduleDescription;
    }
    this.saleTerms = this.configService.saleTerms;
  }

  determineActiveGoat(goats: Goat[]) {
    if (this.searchParam && !this.activeGoat) {
      this.activeGoat = goats[findMatch(this.searchParam, goats)];
      if (this.schedule) {
        this.activeIndex = this.schedule.findIndex(kidding => kidding.dam === this.activeGoat?.normalizeId || kidding.sire === this.activeGoat?.normalizeId);
      }
    }
  }
}
