import { Component, type OnInit } from '@angular/core';

import type { Observable } from 'rxjs';
import type { Page } from '../../app-routing.module';
import { GoatService } from '../../services/goat/goat.service';


@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent implements OnInit, Page {
  name = 'Does';
  getter = this.goatService.does;
  constructor(public goatService: GoatService) { }
  ngOnInit(): void {
    this.setDescription();
  }
  setDescription(): void | Observable<void> {
    //TODO: throw new Error('Method not implemented.');
  }
}
