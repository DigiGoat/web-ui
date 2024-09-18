import type { HttpErrorResponse } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import type { Page } from '../../app-routing.module';
import { GoatService, type Goat, type Kidding } from '../../services/goat/goat.service';

@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrl: './kidding-schedule.component.scss'
})
export class KiddingScheduleComponent implements OnInit, Page {
  schedule?: Kidding[];

  public err?: HttpErrorResponse;
  public noSchedule = false;
  public does?: Goat[];
  public bucks?: Goat[];
  public activeGoat?: Goat;
  public searchParam?: string;
  public activeIndex?: number;

  constructor(private goatService: GoatService, private route: ActivatedRoute) { }
  setDescription(): Observable<void> | void {
    //TODO: Implement setDescription
  }

  ngOnInit() {
    this.searchParam = this.route.snapshot.params['goat'];
    this.goatService.kidding.subscribe({
      next: data => {
        this.schedule = data;
        if (!data.length) {
          this.noSchedule = true;
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
  }

  determineActiveGoat(goats: Goat[]) {
    if (this.searchParam) {
      if (!this.activeGoat) {
        this.activeGoat = goats?.find(goat => [goat.nickname, goat.name, goat.normalizeId].includes(this.searchParam));
      }
      if (!this.activeGoat) {
        this.activeGoat = goats?.find(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase()).includes(this.searchParam?.toLowerCase()));
      }
      if (!this.activeGoat) {
        this.searchParam = this.searchParam.replace(/-/g, ' ');
        this.activeGoat = goats?.find(goat => [goat.nickname, goat.name, goat.normalizeId].map(param => param?.toLowerCase().replace(/-/g, ' ')).includes(this.searchParam?.toLowerCase()));
      }
    }
    if (this.schedule) {
      this.activeIndex = this.schedule.findIndex(kidding => kidding.dam === this.activeGoat?.normalizeId || kidding.sire === this.activeGoat?.normalizeId);
    }
  }
}
