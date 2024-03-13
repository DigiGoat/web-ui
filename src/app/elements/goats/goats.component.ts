import type { HttpErrorResponse } from '@angular/common/http';
import { Goat, GoatService } from 'src/app/services/goat.service';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.scss']
})
export class GoatsComponent implements OnInit {
  public goats: Goat[] = [];
  public err?: HttpErrorResponse;
  public noGoats = false;
  constructor(private goatService: GoatService) { }
  @Input() type!: 'Does' | 'Bucks';
  ngOnInit() {
    this.goats = this.getGoats();
    if (!this.goats.length) {
      this.loadGoats();
    }
  }
  getGoats() {
    switch (this.type) {
      case 'Does':
        return this.goatService.does;
      case 'Bucks':
        return this.goatService.bucks;
      default:
        return [];
    }
  }
  loadGoats() {
    let getter: FunctionProperties<GoatService>;
    switch (this.type) {
      case 'Does':
        getter = 'getDoes';
        break;
      case 'Bucks':
        getter = 'getBucks';
        break;
    }
    if (getter) {
      this.goatService[getter]().then(goats => {
        if (!goats.length) {
          this.noGoats = true;
        }
        this.goats = goats;
      }).catch(err => this.err = err);
    } else {
      console.error('Something went wrong while retrieving the type of goats to display', this.type);
    }
  }
}
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
