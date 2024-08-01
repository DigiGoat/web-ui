import { Component, type OnInit } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Page } from '../../app-routing.module';
import { GoatService } from '../../services/goat/goat.service';

@Component({
  selector: 'app-bucks',
  templateUrl: './bucks.component.html',
  styleUrl: './bucks.component.scss'
})
export class BucksComponent implements OnInit, Page {
  name = 'Bucks';
  getter = this.goatService.bucks;
  constructor(public goatService: GoatService) { }
  ngOnInit(): void {
    this.setDescription();
  }
  setDescription(): void | Observable<void> {
    //TODO: throw new Error('Method not implemented.');
  }
}
