import type { HttpErrorResponse } from '@angular/common/http';
import { Goat } from 'src/app/services/goat/goat.service';

import { Component, Input, OnInit } from '@angular/core';


import type { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.scss']
})
export class GoatsComponent implements OnInit {
  public err?: HttpErrorResponse;
  public noGoats = false;
  public activeGoat?: string;
  public invalidActiveGoat?: string;
  constructor(public route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.activeGoat = paramMap.get('goat') || undefined;
    });
  }
  public goats?: Goat[];
  @Input({ required: true, alias: 'goats' }) getter!: Observable<Goat[]>;
  @Input({ required: true }) name!: string;
  ngOnInit() {
    this.getter.subscribe({
      next: goats => {
        if (!goats.length) {
          this.noGoats = true;
        }
        this.goats = goats;
        if (this.activeGoat && !this.goats.find(goat => [goat.nickname, goat.name, goat.normalizeId].includes(this.activeGoat))) {
          this.invalidActiveGoat = this.activeGoat;
        }
      },
      error: err => this.err = err
    });
  }
}
