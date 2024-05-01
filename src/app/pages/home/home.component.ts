import { Component, type OnInit } from '@angular/core';

import type { Observable } from 'rxjs';
import type { Page } from '../../app-routing.module';
import { ConfigService } from '../../services/config/config.service';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements Page, OnInit {
  public description = '';
  constructor(public config: ConfigService, private meta: Meta) { }
  ngOnInit(): void {
    this.description = this.config.homeDescription;
    this.setDescription();
  }
  setDescription(): void | Observable<void> {
    if (this.config.homeDescription) {
      this.meta.addTags([{ name: 'og:description', content: this.description }, { name: 'description', content: this.description }]);
    }
  }
}
