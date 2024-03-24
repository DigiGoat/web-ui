import type { HttpErrorResponse } from '@angular/common/http';
import { Goat } from 'src/app/services/goat/goat.service';

import { Component, Input, OnInit } from '@angular/core';


import type { Observable } from 'rxjs';


@Component({
  selector: 'app-goats',
  templateUrl: './goats.component.html',
  styleUrls: ['./goats.component.scss']
})
export class GoatsComponent implements OnInit {
  public err?: HttpErrorResponse;
  public noGoats = false;
  constructor() { }
  @Input() goats?: Goat[];
  @Input() goatGetter?: Observable<Goat[]>;
  @Input() name?: string;
  ngOnInit() {
    if (!this.goats?.length && this.goatGetter) {
      this.goatGetter.subscribe({
        next: goats => {
        if (!goats.length) {
          this.noGoats = true;
        }
        this.goats = goats;
        },
        error: err => this.err = err
      });
    } else if (!this.goatGetter) {
      console.error('No Getter Function Provided, This Is A Software Error');
    }
  }
}
